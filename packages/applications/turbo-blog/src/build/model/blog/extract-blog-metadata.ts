import parse from "front-matter";
import { type Result, createErr, createOk } from "option-t/esm/PlainResult";
import type { BlogMetadata } from "./blog.entity";

interface Output {
	content: string;
	metadata: BlogMetadata;
}

export const extractBlogMetadata: (
	blogContent: string,
) => Result<Output, Error> = (blogContent) => {
	const parsed = parse(blogContent);

	const content = parsed.body;

	if (!validateMetadata(parsed.attributes)) {
		return createErr(new Error("Invalid metadata"));
	}

	return createOk({
		content,
		metadata: parsed.attributes,
	});
};

// biome-ignore lint: this is valid any usecase
const validateMetadata = function (metadata: any): metadata is BlogMetadata {
	if (typeof metadata !== "object" || metadata === null) {
		return false;
	}

	if (typeof metadata.title !== "string") {
		return false;
	}

	if (!Array.isArray(metadata.tags)) {
		return false;
	}

	if (typeof metadata.description !== "string") {
		return false;
	}

	if (typeof metadata.publishedAt !== "string") {
		return false;
	}

	if (typeof metadata.updatedAt !== "string") {
		return false;
	}

	return true;
};
