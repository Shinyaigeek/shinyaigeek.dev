import type { Heading } from "mdast";
import type { HeadingNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapHeading: (node: Heading) => HeadingNode = (node) => ({
	type: "heading",
	depth: node.depth,
	children: node.children.map(mapNode),
});
