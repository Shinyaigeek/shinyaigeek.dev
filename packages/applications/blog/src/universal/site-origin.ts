/**
 * Each language is served from its own host, so anything that needs an absolute
 * URL -- og:url, the OG image, the language switcher -- has to pick one. Keeping
 * that in a single place is how the switcher stops shipping an http:// link
 * while the head ships https://.
 */
export const siteOrigin = (language: "en" | "ja") =>
	language === "en"
		? "https://en.shinyaigeek.dev"
		: "https://ja.shinyaigeek.dev";
