import resolveAcceptLanguage from "resolve-accept-language";

const handler = function (event: FetchEvent) {
	const { url } = event.request;
	const { pathname, search } = new URL(url);

	if (!(pathname.endsWith(".html") || pathname.endsWith("/"))) {
		return fetch(event.request);
	}

	const acceptLanguage = event.request.headers.get("accept-language");
	if (!acceptLanguage) {
		return fetch(event.request);
	}
	const preferedLanguage = resolveAcceptLanguage(
		acceptLanguage,
		["en-US", "ja-JP"],
		"ja-JP",
	);

	if (preferedLanguage === "en-US") {
		return Response.redirect(
			`https://en.shinyaigeek.dev${pathname}${search}`,
			301,
		);
	}

	return fetch(event.request);
};

addEventListener("fetch", (event) => {
	event.respondWith(handler(event));
});
