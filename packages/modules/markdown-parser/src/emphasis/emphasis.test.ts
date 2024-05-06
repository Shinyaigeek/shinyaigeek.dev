import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { parseMarkdown } from "../parser";
import { mapEmphasis } from "./empasis";

describe("mapEmphasis", () => {
	it("should map Break to code", () => {
		const result = mapEmphasis({
			type: "emphasis",
			children: [
				{
					type: "text",
					value: "Hello, World!",
				},
			],
		});
		expect(result).toEqual({
			type: "emphasis",
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
			"./src/emphasis/__fixture__/emphasis.md",
			"utf-8",
		);
		const result = parseMarkdown(data);

		expect(result).toMatchFileSnapshot("./__snapshot__/emphasis.ast.txt");
	});
});
