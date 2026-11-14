import { resolveAcceptLanguage } from "resolve-accept-language";

type Representation = "markdown" | "html";

type MediaRange = { type: string; subtype: string; q: number };

const parseAccept = (accept: string): MediaRange[] =>
	accept.split(",").flatMap((part) => {
		const [range = "", ...params] = part.split(";");
		const [type, subtype] = range.trim().toLowerCase().split("/");
		if (!type || !subtype) {
			return [];
		}
		const qParam = params
			.map((param) => param.trim().toLowerCase())
			.find((param) => param.startsWith("q="));
		const q = qParam === undefined ? 1 : Number(qParam.slice(2));
		return Number.isNaN(q) ? [] : [{ type, subtype, q }];
	});

// RFC 9110 12.5.1: a media type takes the q of the most specific range that
// matches it, so `text/html;q=0.5, */*` still ranks HTML at 0.5.
const qualityOf = (ranges: MediaRange[], mediaType: string): number => {
	const [type, subtype] = mediaType.split("/");
	const exact = ranges.find((r) => r.type === type && r.subtype === subtype);
	const typeWildcard = ranges.find((r) => r.type === type && r.subtype === "*");
	const anyWildcard = ranges.find((r) => r.type === "*" && r.subtype === "*");
	return (exact ?? typeWildcard ?? anyWildcard)?.q ?? 0;
};

/**
 * Markdown only when a client names `text/markdown` and ranks it strictly
 * above HTML; a tie, or a client that only says `*\/*`, gets the page.
 */
export const preferredRepresentation = (
	accept: string | null,
): Representation => {
	const ranges = parseAccept(accept ?? "");
	const markdown = ranges.find(
		(r) => r.type === "text" && r.subtype === "markdown",
	);
	if (!markdown || markdown.q <= 0) {
		return "html";
	}
	const html = Math.max(
		qualityOf(ranges, "text/html"),
		qualityOf(ranges, "application/xhtml+xml"),
	);
	return markdown.q > html ? "markdown" : "html";
};

const englishRedirect = (request: Request, url: URL): Response | null => {
	const acceptLanguage = request.headers.get("accept-language");
	if (!acceptLanguage) {
		return null;
	}
	const preferredLanguage = resolveAcceptLanguage(
		acceptLanguage,
		["en-US", "ja-JP"],
		"ja-JP",
	);
	if (preferredLanguage !== "en-US") {
		return null;
	}
	return Response.redirect(
		`https://en.shinyaigeek.dev${url.pathname}${url.search}`,
		301,
	);
};

const withHeaders = (
	response: Response,
	set: Record<string, string>,
	append: Record<string, string>,
): Response => {
	const headers = new Headers(response.headers);
	for (const [name, value] of Object.entries(set)) {
		headers.set(name, value);
	}
	for (const [name, value] of Object.entries(append)) {
		headers.append(name, value);
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
};

/**
 * Sends visitors who prefer English to the English host and leaves everyone
 * else on the Japanese one. A directory request that prefers `text/markdown`
 * gets the page's `index.md` twin instead of its HTML. Only document requests
 * are considered; anything else falls straight through.
 */
export const handleRequest = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const isDirectory = url.pathname.endsWith("/");

	if (!(url.pathname.endsWith(".html") || isDirectory)) {
		return fetch(request);
	}

	const redirect = englishRedirect(request, url);
	if (redirect) {
		return redirect;
	}

	if (!isDirectory || (request.method !== "GET" && request.method !== "HEAD")) {
		return fetch(request);
	}

	const markdownUrl = new URL("index.md", url);

	if (preferredRepresentation(request.headers.get("accept")) === "markdown") {
		const markdown = await fetch(markdownUrl, {
			method: request.method,
			headers: request.headers,
		});
		// A 304 answers the client's validator for the .md itself, so it is the
		// twin's answer to pass on, not a sign that there is no twin.
		if (markdown.ok || markdown.status === 304) {
			return withHeaders(
				markdown,
				{
					"content-type": "text/markdown; charset=utf-8",
					"content-location": markdownUrl.pathname,
				},
				{ vary: "Accept" },
			);
		}
		return withHeaders(await fetch(request), {}, { vary: "Accept" });
	}

	const html = await fetch(request);
	return withHeaders(
		html,
		{},
		html.ok
			? {
					vary: "Accept",
					link: `<${markdownUrl.pathname}>; rel="alternate"; type="text/markdown"`,
				}
			: { vary: "Accept" },
	);
};

export default {
	fetch: (request) => handleRequest(request),
} satisfies ExportedHandler;
