import remarkParse from "remark-parse";
import { unified } from "unified";
import type { AST } from "./ast";
import { mapNode } from "./mapNode";

export const parseMarkdown: (markdown: string) => AST = (markdown) => {
	const parsed = unified().use(remarkParse).parse(markdown);

	return {
		type: parsed.type,
		children: parsed.children.map(mapNode),
	};
};
