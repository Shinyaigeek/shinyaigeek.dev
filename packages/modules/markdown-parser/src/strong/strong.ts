import type { Strong } from "mdast";
import type { StrongNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapStrong: (node: Strong) => StrongNode = (node) => ({
	type: "strong",
	children: node.children.map(mapNode),
});
