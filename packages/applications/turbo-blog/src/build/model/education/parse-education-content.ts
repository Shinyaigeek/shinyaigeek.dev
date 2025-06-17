import {
	type Result,
	createOk,
	isErr,
	unwrapOk,
} from "option-t/esm/PlainResult";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { EducationMetadata } from "./education.entity";
import { extractEducationMetadata } from "./extract-education-metadata";

interface ParseEducationContentResult {
	metadata: EducationMetadata;
	body: string;
}

export const parseEducationContent: (
	content: string,
) => Promise<Result<ParseEducationContentResult, Error>> = async (content) => {
	const extractMetadataResult = extractEducationMetadata(content);

	if (isErr(extractMetadataResult)) {
		return extractMetadataResult;
	}

	const { content: markdownContent, metadata } = unwrapOk(
		extractMetadataResult,
	);

	// Parse markdown to HTML
	const parsed = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(markdownContent);

	const body = parsed.toString();

	return createOk({
		metadata,
		body,
	});
};
