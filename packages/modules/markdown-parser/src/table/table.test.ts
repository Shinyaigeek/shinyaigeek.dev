import { describe, expect, it } from "vitest";
import { mapTable } from "./table";

describe("table", () => {
	it("keeps column alignment, using null for columns that set none", () => {
		const result = mapTable({
			type: "table",
			align: ["left", "center", "right", null],
			children: [],
		});

		expect(result.align).toEqual(["left", "center", "right", null]);
	});

	it("treats a table with no alignment row as having no alignments", () => {
		expect(mapTable({ type: "table", children: [] }).align).toEqual([]);
	});

	it("maps rows and cells", () => {
		const result = mapTable({
			type: "table",
			children: [
				{
					type: "tableRow",
					children: [
						{ type: "tableCell", children: [{ type: "text", value: "a" }] },
						{ type: "tableCell", children: [{ type: "text", value: "b" }] },
					],
				},
			],
		});

		expect(result.children).toEqual([
			{
				type: "table-row",
				children: [
					{ type: "table-cell", children: [{ type: "text", value: "a" }] },
					{ type: "table-cell", children: [{ type: "text", value: "b" }] },
				],
			},
		]);
	});
});
