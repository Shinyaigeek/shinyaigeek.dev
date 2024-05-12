import type { FootnoteDefinition } from "mdast";
import type { FootnoteDefinitionNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapFootnoteDefinition: (
	node: FootnoteDefinition,
) => FootnoteDefinitionNode = (node) => ({
	type: "footnote-definition",
	identifier: node.identifier,
	children: node.children.map(mapNode),
});
