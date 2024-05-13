import type { InlineCode } from "mdast";
import type { InlineCodeNode } from "../ast";

export const mapInlineCode: (node: InlineCode) => InlineCodeNode = (node) => ({
	type: "inline-code",
	value: node.value,
});
