import type { Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

export const parseRawMarkdown: (markdown: string) => Root = (markdown) =>
	unified().use(remarkParse).parse(markdown);
