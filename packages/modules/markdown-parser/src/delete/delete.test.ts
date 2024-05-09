import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { parseMarkdown } from "../parser";
import { mapDelete } from "./delete";

describe("delete", () => {
	it("should map Break to code", () => {
		const result = mapDelete({
			type: "delete",
			children: [
				{
					type: "text",
					value: "Hello, World!",
				},
			],
		});
		expect(result).toEqual({
			type: "delete",
			children: [
				{
					type: "text",
					value: "Hello, World!",
				},
			],
		});
	});

	it("with parse", async () => {
		const data = await fs.readFile(
			"./src/delete/__fixture__/delete.md",
			"utf-8",
		);
		const result = parseMarkdown(data);

		expect(result).toMatchFileSnapshot("./__snapshot__/delete.ast.txt");
	});
});
