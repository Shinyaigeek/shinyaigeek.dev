import type { TableCell } from "mdast";
import type { TableCellNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapTableCell: (node: TableCell) => TableCellNode = (node) => ({
	type: "table-cell",
	children: node.children.map(mapNode),
});
