import fs from "fs";
import { strict as assert } from "assert";

export interface Entry {
	title: string;
	slug: string;
	ogp?: string;
	description?: string;
	publishedAt: string;
}

export const getThirdPirty = (target: string) => {
	const jsonSrc = fs.readFileSync(target, { encoding: "utf-8" });
	const json = JSON.parse(jsonSrc);

	if (!Array.isArray(json)) {
		throw new Error(`third pirty.json should be array, but got ${typeof json}`);
	}

	return json.map((entry) => {
		assert(entry.title);
		assert(entry.slug);
		assert(entry.publishedAt);

		return {
			...entry,
			ogp: entry.ogp === "" ? undefined : entry.ogp,
			description: entry.description === "" ? undefined : entry.description,
		};
	}) as Entry[];
};
