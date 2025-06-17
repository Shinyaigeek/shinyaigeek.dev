import parse from "front-matter";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { AboutMe } from "./about-me.entity";
import { extractAboutMeMetadata } from "./extract-about-me-metadata";

export const parseAboutMeContent = async (
	content: string,
): Promise<AboutMe> => {
	const parsed = parse(content);
	const metadata = extractAboutMeMetadata(parsed.attributes);
	const markdownContent = parsed.body;

	// Parse markdown to HTML
	const processed = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(markdownContent);

	const body = processed.toString();

	return {
		metadata,
		body,
	};
};
