import type { AboutMeMetadata } from "./about-me.entity";

export const extractAboutMeMetadata = (data: unknown): AboutMeMetadata => {
	if (typeof data !== "object" || data === null) {
		throw new Error("Invalid metadata format");
	}

	const obj = data as Record<string, unknown>;

	const name = obj.name;
	if (typeof name !== "string") {
		throw new Error("name is required and must be a string");
	}

	const location = obj.location;
	if (typeof location !== "string") {
		throw new Error("location is required and must be a string");
	}

	const occupation = obj.occupation;
	if (typeof occupation !== "string") {
		throw new Error("occupation is required and must be a string");
	}

	return {
		name,
		location,
		occupation,
	};
};
