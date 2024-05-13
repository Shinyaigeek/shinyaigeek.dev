import type { Link } from "mdast";
import type { LinkNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapLink: (node: Link) => LinkNode = (node) => ({
	type: "link",
	url: node.url,
	title: node.title ?? null,
	children: node.children.map(mapNode),
});
