import type { Paragraph } from "mdast";
import type { ParagraphNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapParagraph: (node: Paragraph) => ParagraphNode = (node) => ({
	type: "paragraph",
	children: node.children.map(mapNode),
});
