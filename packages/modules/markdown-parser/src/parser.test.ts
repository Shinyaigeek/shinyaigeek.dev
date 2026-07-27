import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import type { Node, NodeType } from "./ast";
import { parseMarkdown } from "./parser";

const readFixture = () =>
	fs.readFile("./src/__fixture__/kitchen-sink.md", "utf-8");

const collectTypes = (node: { type: string; children?: unknown[] }) => {
	const types = new Set<string>([node.type]);
	for (const child of (node.children ?? []) as Node[]) {
		for (const type of collectTypes(child)) types.add(type);
	}
	return types;
};

/**
 * Every node type the mapper can produce. Typed as a Record so that adding a
 * member to the AST union without listing it here is a compile error, which is
 * what keeps the fixture below honest about its coverage.
 */
const EXPECTED_NODE_TYPES: Record<NodeType, true> = {
	blockquote: true,
	break: true,
	code: true,
	definition: true,
	delete: true,
	emphasis: true,
	"footnote-definition": true,
	"footnote-reference": true,
	heading: true,
	html: true,
	image: true,
	"image-reference": true,
	"inline-code": true,
	link: true,
	"link-reference": true,
	list: true,
	"list-item": true,
	paragraph: true,
	"reference-definition": true,
	"reference-reference": true,
	strong: true,
	table: true,
	"table-cell": true,
	"table-row": true,
	text: true,
	"thematic-break": true,
	yaml: true,
};

// yaml only appears when the processor enables remark-frontmatter, which
// parseRawMarkdown deliberately does not.
const NOT_IN_FIXTURE = new Set<NodeType>(["yaml"]);

describe("parseMarkdown", () => {
	it("produces every node type the AST declares", async () => {
		const produced = collectTypes(
			await readFixture().then((markdown) => parseMarkdown(markdown)),
		);

		const missing = Object.keys(EXPECTED_NODE_TYPES)
			.filter((type) => !NOT_IN_FIXTURE.has(type as NodeType))
			.filter((type) => !produced.has(type));

		expect(missing).toEqual([]);
	});

	it("maps the whole fixture", async () => {
		const result = parseMarkdown(await readFixture());

		await expect(result).toMatchFileSnapshot(
			"./__snapshot__/kitchen-sink.ast.txt",
		);
	});
});
