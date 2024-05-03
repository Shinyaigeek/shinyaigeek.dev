import type { AST } from "./ast";
import { mapNode } from "./mapNode";
import { parseRawMarkdown } from "./parseMarkdown";

export const parseMarkdown: (markdown: string) => AST = (markdown) => {
	const parsed = parseRawMarkdown(markdown);

	return {
		type: parsed.type,
		children: parsed.children.map(mapNode),
	};
};
