import parse from "front-matter";
import { type Result, createErr, createOk } from "option-t/esm/PlainResult";
import type { EducationMetadata } from "./education.entity";

interface Output {
	content: string;
	metadata: EducationMetadata;
}

export const extractEducationMetadata: (
	content: string,
) => Result<Output, Error> = (content) => {
	const parsed = parse(content);

	const content_body = parsed.body;

	if (!validateMetadata(parsed.attributes)) {
		return createErr(new Error("Invalid education metadata"));
	}

	return createOk({
		content: content_body,
		metadata: parsed.attributes,
	});
};

// biome-ignore lint/suspicious/noExplicitAny: this is valid any usecase
const validateMetadata = function (
	// biome-ignore lint/suspicious/noExplicitAny: this is valid any usecase
	metadata: any,
): metadata is EducationMetadata {
	if (typeof metadata !== "object" || metadata === null) {
		return false;
	}

	if (typeof metadata.institution !== "string") {
		return false;
	}

	if (typeof metadata.startDate !== "string") {
		return false;
	}

	// Optional fields
	if (metadata.endDate !== undefined && typeof metadata.endDate !== "string") {
		return false;
	}

	if (metadata.degree !== undefined && typeof metadata.degree !== "string") {
		return false;
	}

	if (metadata.field !== undefined && typeof metadata.field !== "string") {
		return false;
	}

	if (
		metadata.description !== undefined &&
		typeof metadata.description !== "string"
	) {
		return false;
	}

	if (
		metadata.achievements !== undefined &&
		!Array.isArray(metadata.achievements)
	) {
		return false;
	}

	return true;
};
