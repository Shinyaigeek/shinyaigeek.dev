import parse from "front-matter";
import { type Result, createErr, createOk } from "option-t/esm/PlainResult";
import type { OSSProjectMetadata } from "./oss.entity";

interface Output {
	content: string;
	metadata: OSSProjectMetadata;
}

export const extractOSSMetadata: (content: string) => Result<Output, Error> = (
	content,
) => {
	const parsed = parse(content);

	const content_body = parsed.body;

	if (!validateMetadata(parsed.attributes)) {
		return createErr(new Error("Invalid OSS project metadata"));
	}

	return createOk({
		content: content_body,
		metadata: parsed.attributes,
	});
};

const validateMetadata = function (
	// biome-ignore lint/suspicious/noExplicitAny: this is valid any usecase
	metadata: any,
): metadata is OSSProjectMetadata {
	if (typeof metadata !== "object" || metadata === null) {
		return false;
	}

	if (typeof metadata.name !== "string") {
		return false;
	}

	if (typeof metadata.url !== "string") {
		return false;
	}

	if (metadata.kind !== "creator" && metadata.kind !== "contributor") {
		return false;
	}

	// Optional fields
	if (metadata.stars !== undefined && typeof metadata.stars !== "number") {
		return false;
	}

	if (
		metadata.language !== undefined &&
		typeof metadata.language !== "string"
	) {
		return false;
	}

	if (
		metadata.technologies !== undefined &&
		!Array.isArray(metadata.technologies)
	) {
		return false;
	}

	if (metadata.highlights !== undefined) {
		if (!Array.isArray(metadata.highlights)) {
			return false;
		}
		for (const highlight of metadata.highlights) {
			if (
				typeof highlight.title !== "string" ||
				typeof highlight.url !== "string"
			) {
				return false;
			}
		}
	}

	return true;
};
