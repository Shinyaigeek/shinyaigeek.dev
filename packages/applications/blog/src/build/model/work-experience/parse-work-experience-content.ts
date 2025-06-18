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
import { extractWorkExperienceMetadata } from "./extract-work-experience-metadata";
import type { WorkExperienceMetadata } from "./work-experience.entity";

interface ParseWorkExperienceContentResult {
	metadata: WorkExperienceMetadata;
	body: string;
}

export const parseWorkExperienceContent: (
	content: string,
) => Promise<Result<ParseWorkExperienceContentResult, Error>> = async (
	content,
) => {
	const extractMetadataResult = extractWorkExperienceMetadata(content);

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
