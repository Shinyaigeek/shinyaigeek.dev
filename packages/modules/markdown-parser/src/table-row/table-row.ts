import type { TableRow } from "mdast";
import type { TableRowNode } from "../ast";
import { mapTableCell } from "../table-cell/table-cell";

export const mapTableRow: (node: TableRow) => TableRowNode = (node) => ({
	type: "table-row",
	children: node.children.map(mapTableCell),
});
