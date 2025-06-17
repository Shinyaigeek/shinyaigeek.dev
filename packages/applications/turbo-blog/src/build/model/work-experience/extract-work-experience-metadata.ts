import parse from "front-matter";
import { type Result, createErr, createOk } from "option-t/esm/PlainResult";
import type { WorkExperienceMetadata } from "./work-experience.entity";

interface Output {
	content: string;
	metadata: WorkExperienceMetadata;
}

export const extractWorkExperienceMetadata: (
	content: string,
) => Result<Output, Error> = (content) => {
	const parsed = parse(content);

	const content_body = parsed.body;

	if (!validateMetadata(parsed.attributes)) {
		return createErr(new Error("Invalid work experience metadata"));
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
): metadata is WorkExperienceMetadata {
	if (typeof metadata !== "object" || metadata === null) {
		return false;
	}

	if (typeof metadata.company !== "string") {
		return false;
	}

	if (typeof metadata.startDate !== "string") {
		return false;
	}

	// Optional fields
	if (metadata.endDate !== undefined && typeof metadata.endDate !== "string") {
		return false;
	}

	if (
		metadata.position !== undefined &&
		typeof metadata.position !== "string"
	) {
		return false;
	}

	if (metadata.role !== undefined && typeof metadata.role !== "string") {
		return false;
	}

	if (
		metadata.technologies !== undefined &&
		!Array.isArray(metadata.technologies)
	) {
		return false;
	}

	if (metadata.entries !== undefined) {
		if (!Array.isArray(metadata.entries)) {
			return false;
		}
		for (const entry of metadata.entries) {
			if (typeof entry.title !== "string" || typeof entry.url !== "string") {
				return false;
			}
		}
	}

	return true;
};
