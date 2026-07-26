import { type Result, createOk, isErr, unwrapOk } from "option-t/plain_result";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { extractOSSMetadata } from "./extract-oss-metadata";
import type { OSSProjectMetadata } from "./oss.entity";

interface ParseOSSContentResult {
	metadata: OSSProjectMetadata;
	body: string;
}

export const parseOSSContent: (
	content: string,
) => Promise<Result<ParseOSSContentResult, Error>> = async (content) => {
	const extractMetadataResult = extractOSSMetadata(content);

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
