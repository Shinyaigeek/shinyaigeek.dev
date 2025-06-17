import { describe, expect, it } from "vitest";
import { mapNode } from "../mapNode";
import { parseRawMarkdown } from "../parseMarkdown";

describe("Reference Definition", () => {
	it("should parse reference definitions correctly", () => {
		const markdown = `## 記事内容

これは本文です。ここで参考文献を引用します[^ref1]。
別の文献も引用します[^ref2]。

## 参考文献

[^ref1]: Node.js Documentation - HTTP Module
    https://nodejs.org/api/http.html
    アクセス日: 2024-01-15

[^ref2]: Python aiohttp Documentation  
    https://docs.aiohttp.org/
    アクセス日: 2024-01-15`;

		const parsed = parseRawMarkdown(markdown);
		const nodes = parsed.children.map(mapNode);

		// Find reference definitions
		const referenceDefinitions = nodes.filter(
			(node) => node.type === "reference-definition",
		);
		expect(referenceDefinitions).toHaveLength(2);

		const ref1 = referenceDefinitions.find(
			(node) => node.identifier === "ref1",
		);
		expect(ref1).toBeDefined();
		expect(ref1?.title).toBe("Node.js Documentation - HTTP Module");
		expect(ref1?.url).toBe("https://nodejs.org/api/http.html");
		expect(ref1?.accessDate).toBe("2024-01-15");

		const ref2 = referenceDefinitions.find(
			(node) => node.identifier === "ref2",
		);
		expect(ref2).toBeDefined();
		expect(ref2?.title).toBe("Python aiohttp Documentation");
		expect(ref2?.url).toBe("https://docs.aiohttp.org/");
		expect(ref2?.accessDate).toBe("2024-01-15");
	});

	it("should parse reference references correctly", () => {
		const markdown = `この文章では参考文献[^ref1]を引用しています。

[^ref1]: Test Reference
    https://example.com
    アクセス日: 2024-01-15`;

		const parsed = parseRawMarkdown(markdown);
		const nodes = parsed.children.map(mapNode);

		// Find reference references in paragraph
		const paragraphs = nodes.filter((node) => node.type === "paragraph");
		expect(paragraphs).toHaveLength(1);

		const paragraph = paragraphs[0];
		const referenceReferences = paragraph.children.filter(
			(child) => child.type === "reference-reference",
		);
		expect(referenceReferences).toHaveLength(1);

		const refRef = referenceReferences[0];
		expect(refRef.identifier).toBe("ref1");
	});
});
