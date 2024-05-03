import { type Result, isErr } from "option-t/esm/PlainResult";
import type { BlogContent } from "./blog.entity";
import { extractBlogMetadata } from "./extract-blog-metadata";

export const parseBlogContent: (
	blogContent: string,
) => Result<BlogContent, Error> = (blogContent) => {
	const extractBlogMetadataResult = extractBlogMetadata(blogContent);

	if (isErr(extractBlogMetadataResult)) {
		return extractBlogMetadataResult;
	}
};
