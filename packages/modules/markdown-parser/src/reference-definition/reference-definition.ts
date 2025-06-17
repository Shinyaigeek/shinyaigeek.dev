import type { FootnoteDefinition } from "mdast";
import type { Node } from "../ast";
import type { ReferenceDefinitionNode } from "../ast";
import { mapNode } from "../mapNode";

export const mapReferenceDefinition: (
	node: FootnoteDefinition,
) => ReferenceDefinitionNode = (node) => {
	// Parse the reference content to extract metadata
	const content = node.children.map(mapNode);
	const { title, url, accessDate } = parseReferenceContent(content);

	return {
		type: "reference-definition",
		identifier: node.identifier,
		title,
		url,
		accessDate,
		children: content,
	};
};

// Helper function to parse reference content and extract metadata
const parseReferenceContent = (
	content: Node[],
): { title: string; url?: string; accessDate?: string } => {
	// Default values
	let title = "";
	let url: string | undefined;
	let accessDate: string | undefined;

	// Find the paragraph node (footnotes contain paragraph children)
	const paragraphNode = content.find((node) => node.type === "paragraph");
	if (!paragraphNode || !paragraphNode.children) {
		return { title, url, accessDate };
	}

	const children = paragraphNode.children;
	const titleParts: string[] = [];

	for (const child of children) {
		if (child.type === "text") {
			const text = child.value.trim();
			const lines = text
				.split("\n")
				.map((line) => line.trim())
				.filter((line) => line);

			for (const line of lines) {
				if (!title && line && !line.startsWith("http")) {
					// First non-URL line is the title
					title = line;
				} else if (
					line.includes("アクセス日") ||
					line.toLowerCase().includes("accessed")
				) {
					// Extract access date
					const match = line.match(/[:：]\s*(.+)/);
					if (match) {
						accessDate = match[1].trim();
					}
				}
			}
		} else if (child.type === "link") {
			// Extract URL from link node
			url = child.url;
		}
	}

	return { title, url, accessDate };
};
