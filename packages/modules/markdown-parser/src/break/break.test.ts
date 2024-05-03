import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { parseMarkdown } from "../parser";
import { mapBreak } from "./break";

describe("mapBreak", () => {
	it("should map Break to break", () => {
		const result = mapBreak({ type: "break" });
		expect(result).toEqual({ type: "break" });
	});

	it("with parse", async () => {
		const data = await fs.readFile("./src/break/__fixture__/break.md", "utf-8");
		const result = parseMarkdown(data);

		expect(result).toMatchFileSnapshot("./__snapshot__/break.ast.txt");
	});
});
