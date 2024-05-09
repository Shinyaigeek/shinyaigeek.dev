import type { Delete } from "mdast";
import type { DeleteNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapDelete: (node: Delete) => DeleteNode = (node) => ({
	type: "delete",
	children: node.children.map(mapNode),
});
