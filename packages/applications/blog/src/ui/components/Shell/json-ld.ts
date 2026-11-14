/** A schema.org document, as a page's <script type="application/ld+json"> holds it. */
export type JsonLd = {
	"@context": "https://schema.org";
} & Record<string, unknown>;

/**
 * JSON is not safe to drop into a <script> as is: a string holding
 * "</script>" ends the element early, and an article's title or description
 * is free text. Escaping every "<" as < leaves the JSON meaning the same
 * thing while giving the HTML parser nothing to close the element on.
 */
export const serializeJsonLd = (data: JsonLd) =>
	JSON.stringify(data).replace(/</g, "\\u003c");
