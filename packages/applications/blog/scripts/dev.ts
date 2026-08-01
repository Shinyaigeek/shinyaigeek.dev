/**
 * The blog's dev loop.
 *
 * The blog is a static site generator, so "what the browser shows" is the
 * output of four separate steps -- the CSS module typings, the client bundle,
 * the server bundle, and the generation run that writes the HTML. Any one of
 * them going stale shows up as a page that silently disagrees with the source,
 * so this runs all four and reruns the right ones for whatever changed:
 *
 *   a stylesheet          -> typings, client bundle, browser reload
 *   a page component      -> server bundle, generation, browser reload
 *   an article or a fleet -> generation only (markdown is read at generation
 *                            time, so it never reaches a bundle)
 *   a static asset        -> copy, browser reload
 *
 * The site is then served the way h2o serves it: Japanese and English are
 * separate hosts in production, each with the site at its root, and their pages
 * link to each other with root-absolute paths. So they get a port each here
 * rather than sharing one under a /en prefix, where every one of those links
 * would resolve against the Japanese tree.
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Compiler, rspack } from "@rspack/core";
import {
	type DevServer,
	createSerialRunner,
	devError,
	devLog,
	startDevServer,
	style,
	timed,
	watchDirectories,
} from "build-tool/dev-server";
import { merge } from "webpack-merge";
import clientConfig from "../rspack.config.dev.ts";
import serverConfig from "../rspack.config.server.ts";

const BLOG_ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const PUBLIC = path.join(BLOG_ROOT, "public");

/**
 * Japanese takes the base port and English the next one, as two hosts do.
 *
 * Named per app rather than the conventional PORT because the root `pnpm dev`
 * runs both apps in one shell: a single PORT would put labs on the blog's.
 */
const JAPANESE_PORT = Number(process.env.BLOG_PORT ?? 3000);
const ENGLISH_PORT = JAPANESE_PORT + 1;

/** Read at generation time rather than bundled, so bundling cannot see them. */
const CONTENT_DIRECTORIES = ["src/articles", "src/fleets", "src/profile"].map(
	(directory) => path.join(BLOG_ROOT, directory),
);
const ASSETS_DIRECTORY = path.join(BLOG_ROOT, "src/assets");

const run = (command: string, args: string[]) =>
	new Promise<void>((resolve, reject) => {
		const child = spawn(command, args, {
			cwd: BLOG_ROOT,
			stdio: "inherit",
			// The SSG is off unless something says otherwise; see build.ts.
			env: { ...process.env, SSG_SKIP_OG_IMAGES: "1" },
		});
		child.on("error", reject);
		child.on("exit", (code) =>
			code === 0
				? resolve()
				: reject(new Error(`${command} ${args.join(" ")} exited with ${code}`)),
		);
	});

const binary = (name: string) =>
	path.join(BLOG_ROOT, "node_modules/.bin", name);

/** Regenerates the HTML tree from the server bundle. */
const generate = () =>
	// --enable-source-maps so a handler that throws points at the .tsx it came
	// from rather than at a line in the bundle.
	run(process.execPath, ["--enable-source-maps", "./dist/build.js"]);

const copyAssets = () =>
	fs.cp(ASSETS_DIRECTORY, path.join(PUBLIC, "assets"), { recursive: true });

/**
 * Starts a compiler in watch mode. Resolves once it has produced output for the
 * first time, then calls `onRebuilt` for every rebuild after that.
 *
 * A failed compilation is reported and otherwise ignored: the previous output
 * is still on disk and still servable, which beats tearing the session down
 * over a syntax error that is about to be fixed.
 */
const watchCompiler = (
	label: string,
	compiler: Compiler,
	onRebuilt: () => void,
): Promise<void> => {
	let first = true;

	return new Promise<void>((resolve) => {
		compiler.watch({ aggregateTimeout: 20 }, (error, stats) => {
			if (error) {
				devError(`${label} failed`, error);
				return;
			}

			if (stats?.hasErrors()) {
				devError(`${label} failed`);
				console.error(stats.toString({ colors: true, preset: "errors-only" }));
				return;
			}

			const duration = ((stats?.endTime ?? 0) - (stats?.startTime ?? 0)) / 1000;
			devLog(`${label} ${style.dim(`${duration.toFixed(2)}s`)}`);

			if (first) {
				first = false;
				resolve();
				return;
			}

			onRebuilt();
		});
	});
};

const main = async () => {
	// One clean slate at startup. Everything after this is incremental, and the
	// bundles keep stable names, so nothing accumulates.
	await fs.rm(PUBLIC, { recursive: true, force: true });
	await fs.mkdir(path.join(PUBLIC, "assets"), { recursive: true });

	// Components import named exports from their stylesheets, so the typings
	// have to exist before anything is compiled against them.
	await timed("css module typings", () => run(binary("tcm"), ["src"]));
	await copyAssets();

	const servers: DevServer[] = [];
	const reload = () => {
		for (const server of servers) server.reload();
	};

	const regenerate = createSerialRunner(async () => {
		await timed("generated pages", generate);
		reload();
	});

	const firstClientBuild = watchCompiler(
		"client bundle",
		rspack(clientConfig),
		// A stylesheet or the client script changed. The HTML is unaffected --
		// the bundles are referenced by a name that does not move -- so there is
		// nothing to regenerate, only something to reload.
		reload,
	);

	const firstServerBuild = watchCompiler(
		"server bundle",
		rspack(
			merge(serverConfig, {
				mode: "development",
				// Cheap to produce and readable from a node stack trace, which
				// `eval`-based devtools are not.
				devtool: "source-map",
			}),
		),
		() => regenerate.trigger(),
	);

	await Promise.all([firstClientBuild, firstServerBuild]);
	await timed("generated pages", generate);

	// Watched by hand because their content is read while generating rather than
	// imported, so no bundler ever sees them change.
	await watchDirectories(CONTENT_DIRECTORIES, () => regenerate.trigger());

	const copyRunner = createSerialRunner(async () => {
		await copyAssets();
		reload();
	});
	await watchDirectories([ASSETS_DIRECTORY], () => copyRunner.trigger());

	// The stylesheet typings are generated into src/ beside their stylesheet, so
	// this is left to tcm's own watcher rather than folded into the loop above:
	// watching src/ for changes would see its output and rebuild forever.
	const typings = spawn(binary("tcm"), ["src", "--watch"], {
		cwd: BLOG_ROOT,
		stdio: "ignore",
	});

	servers.push(
		await startDevServer({
			port: JAPANESE_PORT,
			mounts: [
				{ prefix: "/assets", directory: path.join(PUBLIC, "assets") },
				{ prefix: "/", directory: path.join(PUBLIC, "ja") },
			],
		}),
		await startDevServer({
			port: ENGLISH_PORT,
			mounts: [
				{ prefix: "/assets", directory: path.join(PUBLIC, "assets") },
				{ prefix: "/", directory: path.join(PUBLIC, "en") },
			],
		}),
	);

	devLog("");
	devLog(`${style.bold("日本語")}  http://localhost:${JAPANESE_PORT}`);
	devLog(`${style.bold("English")} http://localhost:${ENGLISH_PORT}`);
	devLog(
		style.dim(
			"OG images are not generated in dev; run `pnpm build` for those.",
		),
	);

	const shutdown = () => {
		typings.kill();
		void Promise.all(servers.map((server) => server.close())).then(() =>
			process.exit(0),
		);
	};
	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
};

main().catch((error) => {
	devError("dev server failed to start", error);
	process.exit(1);
});
