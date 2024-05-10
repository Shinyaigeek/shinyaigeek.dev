import type { Image } from "mdast";
import type { ImageNode } from "../ast";

export const mapImage: (node: Image) => ImageNode = (node) => ({
	type: "image",
	url: node.url,
	title: node.title ?? null,
	alt: node.alt ?? null,
});
