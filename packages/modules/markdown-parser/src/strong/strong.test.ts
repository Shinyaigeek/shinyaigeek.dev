import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { parseMarkdown } from "../parser";
import { mapStrong } from "./strong";

describe("strong", () => {
	it("should map Break to code", () => {
		const result = mapStrong({
			type: "strong",
			children: [
				{
					type: "text",
					value: "Hello, World!",
				},
			],
		});
		expect(result).toEqual({
			type: "strong",
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
			"./src/strong/__fixture__/strong.md",
			"utf-8",
		);
		const result = parseMarkdown(data);

		expect(result).toMatchFileSnapshot("./__snapshot__/strong.ast.txt");
	});
});
