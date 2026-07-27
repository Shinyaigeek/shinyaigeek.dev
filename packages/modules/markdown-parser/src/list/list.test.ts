import { describe, expect, it } from "vitest";
import { mapList } from "./list";

describe("list", () => {
	it("normalizes the flags mdast leaves undefined", () => {
		const result = mapList({ type: "list", children: [] });

		expect(result).toEqual({
			type: "list",
			ordered: false,
			start: null,
			spread: false,
			children: [],
		});
	});

	it("keeps the start of an ordered list", () => {
		const result = mapList({
			type: "list",
			ordered: true,
			start: 3,
			spread: true,
			children: [],
		});

		expect(result).toMatchObject({ ordered: true, start: 3, spread: true });
	});

	it("distinguishes an unchecked task item from a plain bullet", () => {
		const result = mapList({
			type: "list",
			children: [
				{ type: "listItem", children: [] },
				{ type: "listItem", checked: false, children: [] },
				{ type: "listItem", checked: true, children: [] },
			],
		});

		expect(result.children.map((item) => item.checked)).toEqual([
			null,
			false,
			true,
		]);
	});
});
