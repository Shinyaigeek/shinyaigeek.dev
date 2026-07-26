import { resolveAcceptLanguage } from "resolve-accept-language";

/**
 * Sends visitors who prefer English to the English host and leaves everyone
 * else on the Japanese one. Only document requests are considered; anything
 * else falls straight through.
 */
const handleRequest = (request: Request): Response | Promise<Response> => {
	const { pathname, search } = new URL(request.url);

	if (!(pathname.endsWith(".html") || pathname.endsWith("/"))) {
		return fetch(request);
	}

	const acceptLanguage = request.headers.get("accept-language");
	if (!acceptLanguage) {
		return fetch(request);
	}

	const preferredLanguage = resolveAcceptLanguage(
		acceptLanguage,
		["en-US", "ja-JP"],
		"ja-JP",
	);

	if (preferredLanguage === "en-US") {
		return Response.redirect(
			`https://en.shinyaigeek.dev${pathname}${search}`,
			301,
		);
	}

	return fetch(request);
};

export default {
	fetch: (request) => handleRequest(request),
} satisfies ExportedHandler;
