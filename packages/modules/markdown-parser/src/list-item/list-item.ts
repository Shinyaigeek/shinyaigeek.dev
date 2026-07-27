import type { ListItem } from "mdast";
import type { ListItemNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapListItem: (node: ListItem) => ListItemNode = (node) => ({
	type: "list-item",
	// null rather than false for a plain bullet: only GFM task list items carry
	// a checkbox at all, and "unchecked" is a different thing from "no checkbox".
	checked: node.checked ?? null,
	spread: node.spread ?? false,
	children: node.children.map(mapNode),
});
