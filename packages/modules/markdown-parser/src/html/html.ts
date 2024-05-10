import type { Html } from "mdast";
import type { HtmlNode } from "../ast";

export const mapHtml: (node: Html) => HtmlNode = (node) => ({
	type: "html",
	html: node.value,
});
