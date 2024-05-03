import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { parseMarkdown } from "../parser";
import { mapCode } from "./code";

describe("mapCode", () => {
	it("should map Break to code", () => {
		const result = mapCode({
			type: "code",
			value: "console.log('Hello, World!')",
		});
		expect(result).toEqual({
			type: "code",
			value: "console.log('Hello, World!')",
			language: null,
			meta: null,
		});
	});

	it("with parse", async () => {
		const data = await fs.readFile("./src/code/__fixture__/code.md", "utf-8");
		const result = parseMarkdown(data);

		expect(result).toMatchFileSnapshot("./__snapshot__/code.ast.txt");
	});
});
