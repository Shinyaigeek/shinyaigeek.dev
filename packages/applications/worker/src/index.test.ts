import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { handleRequest, preferredRepresentation } from "./index";

const BROWSER_ACCEPT =
	"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

type Origin = Record<string, { status: number; body: string; type: string }>;

const stubOrigin = (files: Origin) => {
	const origin = vi.fn(async (input: RequestInfo | URL) => {
		const url = input instanceof Request ? input.url : String(input);
		const file = files[new URL(url).pathname];
		return file
			? new Response(file.body, {
					status: file.status,
					headers: { "content-type": file.type, vary: "Accept-Encoding" },
				})
			: new Response("not found", { status: 404 });
	});
	vi.stubGlobal("fetch", origin);
	return origin;
};

const page = {
	"/post/hello/": { status: 200, body: "<h1>Hello</h1>", type: "text/html" },
	"/post/hello/index.md": {
		status: 200,
		body: "# Hello",
		type: "application/octet-stream",
	},
	"/about/": { status: 200, body: "<h1>About</h1>", type: "text/html" },
	"/assets/main.js": {
		status: 200,
		body: "console.log(1)",
		type: "text/javascript",
	},
};

const get = (path: string, headers: Record<string, string> = {}) =>
	handleRequest(
		new Request(`https://ja.shinyaigeek.dev${path}`, {
			headers: { "accept-language": "ja", ...headers },
		}),
	);

describe("preferredRepresentation", () => {
	it.each([
		[null, "html"],
		[BROWSER_ACCEPT, "html"],
		["*/*", "html"],
		["text/markdown", "markdown"],
		["text/markdown, text/html;q=0.9", "markdown"],
		["text/html, text/markdown;q=0.5", "html"],
		["text/markdown, text/html", "html"],
		["text/markdown;q=0.9, text/html;q=0.5, text/*;q=0.95", "markdown"],
		["text/markdown;q=0, text/html;q=0", "html"],
	] as const)("%s -> %s", (accept, expected) => {
		expect(preferredRepresentation(accept)).toBe(expected);
	});
});

describe("handleRequest", () => {
	let origin: ReturnType<typeof stubOrigin>;
	beforeEach(() => {
		origin = stubOrigin(page);
	});
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("serves HTML to a browser and points at the Markdown twin", async () => {
		const response = await get("/post/hello/", { accept: BROWSER_ACCEPT });
		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toBe("text/html");
		expect(response.headers.get("vary")).toBe("Accept-Encoding, Accept");
		expect(response.headers.get("link")).toBe(
			'</post/hello/index.md>; rel="alternate"; type="text/markdown"',
		);
		expect(await response.text()).toBe("<h1>Hello</h1>");
		expect(origin).toHaveBeenCalledTimes(1);
	});

	it.each(["text/markdown", "text/markdown, text/html;q=0.9"])(
		"serves Markdown for %s",
		async (accept) => {
			const response = await get("/post/hello/", { accept });
			expect(response.status).toBe(200);
			expect(response.headers.get("content-type")).toBe(
				"text/markdown; charset=utf-8",
			);
			expect(response.headers.get("vary")).toBe("Accept-Encoding, Accept");
			expect(response.headers.get("content-location")).toBe(
				"/post/hello/index.md",
			);
			expect(await response.text()).toBe("# Hello");
		},
	);

	it("serves HTML when the client ranks Markdown lower", async () => {
		const response = await get("/post/hello/", {
			accept: "text/html, text/markdown;q=0.5",
		});
		expect(response.headers.get("content-type")).toBe("text/html");
		expect(await response.text()).toBe("<h1>Hello</h1>");
	});

	it("falls back to HTML when the page has no Markdown twin", async () => {
		const response = await get("/about/", { accept: "text/markdown" });
		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toBe("text/html");
		expect(response.headers.get("vary")).toBe("Accept-Encoding, Accept");
		expect(response.headers.get("link")).toBeNull();
		expect(await response.text()).toBe("<h1>About</h1>");
	});

	it("passes a 304 for the Markdown twin on rather than falling back", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(null, { status: 304 })),
		);
		const response = await get("/post/hello/", {
			accept: "text/markdown",
			"if-none-match": '"md-etag"',
		});
		expect(response.status).toBe(304);
		expect(response.headers.get("content-location")).toBe(
			"/post/hello/index.md",
		);
	});

	it("passes non-document requests through untouched", async () => {
		const response = await get("/assets/main.js", { accept: "text/markdown" });
		expect(response.headers.get("content-type")).toBe("text/javascript");
		expect(response.headers.get("vary")).toBe("Accept-Encoding");
		expect(response.headers.get("link")).toBeNull();
		expect(await response.text()).toBe("console.log(1)");
	});

	it("still redirects English-preferring visitors before negotiating", async () => {
		const response = await get("/post/hello/?x=1", {
			"accept-language": "en-US,en;q=0.9",
			accept: "text/markdown",
		});
		expect(response.status).toBe(301);
		expect(response.headers.get("location")).toBe(
			"https://en.shinyaigeek.dev/post/hello/?x=1",
		);
		expect(origin).not.toHaveBeenCalled();
	});
});
