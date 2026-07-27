import type { LinkReference } from "mdast";
import type { LinkReferenceNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapLinkReference: (node: LinkReference) => LinkReferenceNode = (
	node,
) => ({
	type: "link-reference",
	identifier: node.identifier,
	label: node.label ?? null,
	reference: node.referenceType,
	children: node.children.map(mapNode),
});
