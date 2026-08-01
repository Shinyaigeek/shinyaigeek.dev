/**
 * Labs' dev loop, the smaller sibling of the blog's.
 *
 * Labs had no dev loop at all: seeing a change meant `pnpm build` -- a clean,
 * both bundles and a full generation, five seconds -- and then restarting
 * `pnpm preview` by hand, with a manual refresh on top. Here the bundles stay
 * in watch mode, so a change costs a rebuild and a generation, and the page
 * reloads itself.
 *
 * Everything labs renders is TypeScript, so unlike the blog there is no content
 * to watch separately: it all reaches the server bundle, and a rebuild of that
 * is the signal to regenerate.
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
	type DevServer,
	createSerialRunner,
	devError,
	devLog,
	startDevServer,
	style,
	timed,
} from "build-tool/dev-server";
import webpack, { type Compiler } from "webpack";
import { merge } from "webpack-merge";
import clientConfig from "../webpack.config.dev.ts";
import serverConfig from "../webpack.config.server.ts";

const LABS_ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const PUBLIC = path.join(LABS_ROOT, "public");
const DIST = path.join(LABS_ROOT, "dist");

/**
 * Named per app rather than the conventional PORT because the root `pnpm dev`
 * runs both apps in one shell: a single PORT would put this on the blog's.
 * 3002 leaves 3000 and 3001 to the blog's two languages.
 */
const PORT = Number(process.env.LABS_PORT ?? 3002);

/** Regenerates the HTML tree from the server bundle. */
const generate = () =>
	new Promise<void>((resolve, reject) => {
		// --enable-source-maps so a handler that throws points at the .tsx it came
		// from rather than at a line in the bundle.
		const child = spawn(
			process.execPath,
			["--enable-source-maps", "./dist/build.js"],
			{ cwd: LABS_ROOT, stdio: "inherit" },
		);
		child.on("error", reject);
		child.on("exit", (code) =>
			code === 0
				? resolve()
				: reject(new Error(`generation exited with ${code}`)),
		);
	});

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
	// One clean slate at startup, so a content hashed bundle left behind by
	// `pnpm build` cannot sit next to the unhashed one this writes -- the
	// built-assets plugin insists on finding exactly one stylesheet.
	await fs.rm(PUBLIC, { recursive: true, force: true });
	await fs.rm(DIST, { recursive: true, force: true });

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
		webpack(clientConfig),
		// The stylesheet is linked by a name that does not move, so there is
		// nothing to regenerate here -- only something to reload.
		reload,
	);

	const firstServerBuild = watchCompiler(
		"server bundle",
		webpack(
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

	servers.push(
		await startDevServer({
			port: PORT,
			// One host with the site at its root, the way h2o serves
			// labs.shinyaigeek.dev.
			mounts: [{ prefix: "/", directory: PUBLIC }],
		}),
	);

	devLog("");
	devLog(`${style.bold("labs")} http://localhost:${PORT}`);

	const shutdown = () => {
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
