import fs from "node:fs/promises";
import http from "node:http";
import type { ServerResponse } from "node:http";
import path from "node:path";
import { LIVE_RELOAD_ENDPOINT, injectLiveReload } from "./live-reload.ts";
import { contentTypeOf, isHtml } from "./mime.ts";

/**
 * A directory served under a path prefix, the way h2o's `file.dir` entries are.
 *
 * The blog needs this because its generated tree is not a single servable
 * directory: pages land in public/ja and public/en while the bundles land in
 * public/assets, and production stitches those together per host. Serving
 * public/ as one root instead -- which is what `rspack serve` did -- puts the
 * site at /ja/, where every root-absolute link in it 404s.
 */
export interface Mount {
	/** Path prefix, leading slash, no trailing slash except for the root "/". */
	prefix: string;
	/** Absolute path of the directory to serve under that prefix. */
	directory: string;
}

export interface DevServerOptions {
	port: number;
	mounts: Mount[];
}

export interface DevServer {
	url: string;
	/** Tells every open page to reload. */
	reload: () => void;
	close: () => Promise<void>;
}

interface ResolvedMount extends Mount {
	directory: string;
}

const NO_STORE = {
	"Cache-Control": "no-store, must-revalidate",
} as const;

/**
 * Longest prefix first, so a "/assets" mount is consulted before the "/" one
 * regardless of the order they were declared in.
 */
const byPrefixLength = (a: Mount, b: Mount) =>
	b.prefix.length - a.prefix.length;

const matchMount = (
	mounts: ResolvedMount[],
	pathname: string,
): { mount: ResolvedMount; rest: string } | undefined => {
	for (const mount of mounts) {
		if (mount.prefix === "/") {
			return { mount, rest: pathname };
		}
		if (pathname === mount.prefix) {
			return { mount, rest: "/" };
		}
		if (pathname.startsWith(`${mount.prefix}/`)) {
			return { mount, rest: pathname.slice(mount.prefix.length) };
		}
	}

	return undefined;
};

type Resolution =
	| { kind: "file"; filePath: string }
	| { kind: "directory-redirect" }
	| { kind: "missing" };

const resolveWithin = async (
	directory: string,
	rest: string,
	pathnameEndsWithSlash: boolean,
): Promise<Resolution> => {
	// `rest` always starts with "/", so "." + rest keeps this relative to the
	// mount and any "..", however it was encoded, resolves before the check
	// below rather than after the file has already been read.
	const target = path.resolve(directory, `.${rest}`);
	if (target !== directory && !target.startsWith(directory + path.sep)) {
		return { kind: "missing" };
	}

	const stats = await fs.stat(target).catch(() => undefined);

	if (stats?.isFile()) {
		return { kind: "file", filePath: target };
	}

	if (stats?.isDirectory()) {
		// h2o redirects a directory request that is missing its trailing slash,
		// and quietly serving the index instead would hide that here. The blog's
		// links and labs' speculation rules are both written against the
		// trailing-slash form, so dev has to hold them to it too.
		if (!pathnameEndsWithSlash) {
			return { kind: "directory-redirect" };
		}

		const index = path.join(target, "index.html");
		const indexStats = await fs.stat(index).catch(() => undefined);
		if (indexStats?.isFile()) {
			return { kind: "file", filePath: index };
		}
	}

	return { kind: "missing" };
};

const notFoundPage = (pathname: string, mounts: ResolvedMount[]) => `
<!doctype html>
<meta charset="utf-8">
<title>404 — ${pathname}</title>
<style>
	body { font-family: ui-monospace, monospace; margin: 3rem auto; max-width: 46rem; padding: 0 1.5rem; line-height: 1.7; }
	code { background: rgba(127,127,127,.18); padding: .1em .35em; border-radius: .25em; }
	li { margin: .25rem 0; }
</style>
<h1>404</h1>
<p>Nothing generated at <code>${pathname}</code> yet.</p>
<p>Served from:</p>
<ul>
${mounts.map((mount) => `<li><code>${mount.prefix}</code> → <code>${mount.directory}</code></li>`).join("\n")}
</ul>
<p>This page reloads itself once the next build finishes.</p>
`;

export const startDevServer = async ({
	port,
	mounts,
}: DevServerOptions): Promise<DevServer> => {
	const resolvedMounts: ResolvedMount[] = mounts
		.map((mount) => ({
			...mount,
			directory: path.resolve(mount.directory),
		}))
		.sort(byPrefixLength);

	const liveReloadClients = new Set<ServerResponse>();
	let generation = 0;

	const sendHtml = (response: ServerResponse, status: number, html: string) => {
		const body = injectLiveReload(html);
		response.writeHead(status, {
			...NO_STORE,
			"Content-Type": "text/html; charset=utf-8",
			"Content-Length": Buffer.byteLength(body),
		});
		response.end(body);
	};

	const server = http.createServer(async (request, response) => {
		const requestUrl = new URL(
			request.url ?? "/",
			`http://${request.headers.host ?? "localhost"}`,
		);

		if (requestUrl.pathname === LIVE_RELOAD_ENDPOINT) {
			response.writeHead(200, {
				...NO_STORE,
				"Content-Type": "text/event-stream",
				Connection: "keep-alive",
			});
			response.write(`event: generation\ndata: ${generation}\n\n`);
			liveReloadClients.add(response);
			request.on("close", () => liveReloadClients.delete(response));
			return;
		}

		let pathname: string;
		try {
			pathname = decodeURIComponent(requestUrl.pathname);
		} catch {
			sendHtml(response, 400, "<h1>400</h1><p>Malformed path.</p>");
			return;
		}

		const matched = matchMount(resolvedMounts, pathname);
		if (!matched) {
			sendHtml(response, 404, notFoundPage(pathname, resolvedMounts));
			return;
		}

		const resolution = await resolveWithin(
			matched.mount.directory,
			matched.rest,
			pathname.endsWith("/"),
		);

		if (resolution.kind === "directory-redirect") {
			response.writeHead(301, {
				...NO_STORE,
				Location: `${requestUrl.pathname}/${requestUrl.search}`,
			});
			response.end();
			return;
		}

		if (resolution.kind === "missing") {
			sendHtml(response, 404, notFoundPage(pathname, resolvedMounts));
			return;
		}

		// HTML is read rather than streamed because the live-reload snippet has to
		// go into it; everything else goes out as-is.
		if (isHtml(resolution.filePath)) {
			sendHtml(response, 200, await fs.readFile(resolution.filePath, "utf-8"));
			return;
		}

		const body = await fs.readFile(resolution.filePath);
		response.writeHead(200, {
			...NO_STORE,
			"Content-Type": contentTypeOf(resolution.filePath),
			"Content-Length": body.byteLength,
		});
		response.end(request.method === "HEAD" ? undefined : body);
	});

	// Keeps idle connections from being reaped as merely slow. Unreffed so it is
	// never the reason the process stays up.
	const heartbeat = setInterval(() => {
		for (const client of liveReloadClients) {
			client.write(": ping\n\n");
		}
	}, 30_000);
	heartbeat.unref();

	await new Promise<void>((resolve, reject) => {
		server.once("error", (error: NodeJS.ErrnoException) => {
			// By far the most common way this fails, and a stack trace says nothing
			// useful about it -- what is wanted is the port and the way out.
			reject(
				error.code === "EADDRINUSE"
					? new Error(
							`Port ${port} is already in use. Stop whatever is on it, or set PORT to something else.`,
						)
					: error,
			);
		});
		server.listen(port, () => {
			server.removeAllListeners("error");
			resolve();
		});
	});

	return {
		url: `http://localhost:${port}`,
		reload: () => {
			generation += 1;
			for (const client of liveReloadClients) {
				client.write(`event: generation\ndata: ${generation}\n\n`);
			}
		},
		close: async () => {
			clearInterval(heartbeat);
			for (const client of liveReloadClients) {
				client.end();
			}
			liveReloadClients.clear();
			await new Promise<void>((resolve) => server.close(() => resolve()));
		},
	};
};
