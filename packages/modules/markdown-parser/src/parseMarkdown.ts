import type { Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

export const parseRawMarkdown: (markdown: string) => Root = (markdown) =>
	unified().use(remarkParse).use(remarkGfm).parse(markdown);
