import type { List } from "mdast";
import type { ListNode } from "../ast";
import { mapListItem } from "../list-item/list-item";

export const mapList: (node: List) => ListNode = (node) => ({
	type: "list",
	// mdast leaves these undefined rather than false when the markdown does not
	// call for them, so normalize instead of passing the gaps through.
	ordered: node.ordered ?? false,
	start: node.start ?? null,
	spread: node.spread ?? false,
	children: node.children.map(mapListItem),
});
