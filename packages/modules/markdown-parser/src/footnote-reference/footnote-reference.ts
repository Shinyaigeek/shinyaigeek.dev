import type { FootnoteReference } from "mdast";
import type { FootnoteReferenceNode } from "../ast";

export const mapFootnoteReference: (
	node: FootnoteReference,
) => FootnoteReferenceNode = (node) => ({
	type: "footnote-reference",
	label: node.label ?? null,
	identifier: node.identifier,
});
