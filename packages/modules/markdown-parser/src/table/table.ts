import type { Table } from "mdast";
import type { TableNode } from "../ast";
import { mapTableRow } from "../table-row/table-row";

export const mapTable: (node: Table) => TableNode = (node) => ({
	type: "table",
	align: node.align?.map((align) => align ?? null) ?? [],
	children: node.children.map(mapTableRow),
});
