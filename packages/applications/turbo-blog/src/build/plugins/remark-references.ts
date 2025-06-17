import type { FootnoteDefinition, FootnoteReference, Link, Node } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * Remark plugin to transform footnotes with "ref" prefix into reference citations
 * with enhanced metadata parsing and styling
 */
export const remarkReferences: Plugin = () => {
	return (tree) => {
		// Transform footnote references with "ref" prefix
		visit(tree, "footnoteReference", (node: FootnoteReference) => {
			if (node.identifier.startsWith("ref")) {
				// Add custom class for styling
				(node as FootnoteReference & { data?: Record<string, unknown> }).data =
					{
						...node.data,
						hProperties: {
							className: ["reference-link"],
							"data-reference-id": node.identifier,
						},
					};
			}
		});

		// Transform footnote definitions with "ref" prefix
		visit(tree, "footnoteDefinition", (node: FootnoteDefinition) => {
			if (node.identifier.startsWith("ref")) {
				// Parse reference metadata from content
				const metadata = parseReferenceMetadata(node);

				// Add custom class and metadata for styling
				(node as FootnoteDefinition & { data?: Record<string, unknown> }).data =
					{
						...node.data,
						hProperties: {
							className: ["reference-definition"],
							"data-reference-id": node.identifier,
							"data-reference-title": metadata.title,
							"data-reference-url": metadata.url,
							"data-reference-access-date": metadata.accessDate,
						},
					};
			}
		});
	};
};

interface ReferenceMetadata {
	title: string;
	url?: string;
	accessDate?: string;
}

/**
 * Parse reference metadata from footnote definition content
 */
function parseReferenceMetadata(node: FootnoteDefinition): ReferenceMetadata {
	let title = "";
	let url: string | undefined;
	let accessDate: string | undefined;

	// Extract text content from the footnote definition
	const extractTextFromNodes = (nodes: Node[]): string => {
		return nodes
			.map((child) => {
				if (child.type === "text") {
					return (child as { value: string }).value;
				}
				if (child.type === "link") {
					// Store URL and return link text
					url = (child as Link).url;
					return extractTextFromNodes((child as Link).children);
				}
				if ("children" in child && child.children) {
					return extractTextFromNodes(child.children as Node[]);
				}
				return "";
			})
			.join("");
	};

	// Find paragraph content
	const paragraphNode = node.children.find(
		(child) => child.type === "paragraph",
	);
	if (paragraphNode?.children) {
		const fullText = extractTextFromNodes(paragraphNode.children as Node[]);
		const lines = fullText
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line);

		// First non-URL line is the title
		for (const line of lines) {
			if (!title && line && !line.startsWith("http")) {
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

		// Also check for URL in link nodes
		visit(paragraphNode, "link", (linkNode: Link) => {
			if (!url) {
				url = linkNode.url;
			}
		});
	}

	return { title, url, accessDate };
}
