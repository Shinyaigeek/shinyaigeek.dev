import type { Blockquote } from "mdast";
import type { BlockquoteNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapBlockquote: (node: Blockquote) => BlockquoteNode = (node) => ({
	type: "blockquote",
	children: node.children.map(mapNode),
});
