import type { Text } from "mdast";
import type { TextNode } from "../ast";

export const mapText: (node: Text) => TextNode = (node) => ({
	type: "text",
	value: node.value,
});
