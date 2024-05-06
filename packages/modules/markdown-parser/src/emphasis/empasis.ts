import type { Emphasis } from "mdast";
import type { EmphasisNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapEmphasis: (node: Emphasis) => EmphasisNode = (node) => ({
	type: "emphasis",
	children: node.children.map(mapNode),
});
