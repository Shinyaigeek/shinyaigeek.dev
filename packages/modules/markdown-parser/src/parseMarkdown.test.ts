import { describe, expect, it } from "vitest";
import { parseRawMarkdown } from "./parseMarkdown";

const types = (markdown: string) => {
	const found = new Set<string>();
	const walk = (node: { type: string; children?: unknown[] }) => {
		found.add(node.type);
		for (const child of (node.children ?? []) as { type: string }[])
			walk(child);
	};
	walk(parseRawMarkdown(markdown));
	return found;
};

/**
 * remark-gfm was pinned to v3 while remark-parse and unified were on v11, so its
 * micromark extensions never got registered and none of the GFM syntax below was
 * recognised -- silently, because unrecognised syntax just stays literal text.
 * These assertions fail if that combination ever comes back.
 */
describe("GFM support", () => {
	it("parses strikethrough as a delete node", () => {
		expect(types("asdf ~~hoge~~")).toContain("delete");
	});

	it("parses tables", () => {
		const found = types("| a | b |\n| - | - |\n| 1 | 2 |\n");

		expect(found).toContain("table");
		expect(found).toContain("tableRow");
		expect(found).toContain("tableCell");
	});

	it("parses task list items", () => {
		const root = parseRawMarkdown("- [x] done\n- [ ] todo\n");
		const list = root.children[0];
		if (list?.type !== "list") throw new Error("expected a list");

		expect(list.children.map((item) => item.checked)).toEqual([true, false]);
	});

	it("parses bare URLs as autolink literals", () => {
		expect(types("see https://example.com for more")).toContain("link");
	});

	it("parses footnotes", () => {
		const found = types("text[^1]\n\n[^1]: the note\n");

		expect(found).toContain("footnoteReference");
		expect(found).toContain("footnoteDefinition");
	});
});
