import type { ImageReference } from "mdast";
import type { ImageReferenceNode } from "../ast";

export const mapImageReference: (node: ImageReference) => ImageReferenceNode = (
	node,
) => ({
	type: "image-reference",
	reference: node.referenceType,
	alt: node.alt ?? null,
});
