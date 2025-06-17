import type { FootnoteReference } from "mdast";
import type { ReferenceReferenceNode } from "../ast";

export const mapReferenceReference: (
	node: FootnoteReference,
) => ReferenceReferenceNode = (node) => ({
	type: "reference-reference",
	label: node.label ?? null,
	identifier: node.identifier,
});
