import fs from "node:fs/promises";
import path from "node:path";
import { isErr, isOk, unwrapOk } from "option-t/esm/PlainResult";
import { describe, expect, test } from "vitest";
import { extractBlogMetadata } from "./extract-blog-metadata";

describe("extractBlogMetadata", () => {
	test("should return error when metadata is invalid", async () => {
		const content = await fs.readFile(
			path.resolve("./src/build/model/blog/__fixture__/invalid-blog.md"),
			"utf-8",
		);
		const result = extractBlogMetadata(content);

		expect(isErr(result)).toBe(true);
	});

	test("should return metadata when metadata is valid", async () => {
		const content = await fs.readFile(
			path.resolve("./src/build/model/blog/__fixture__/valid-blog.md"),
			"utf-8",
		);
		const result = extractBlogMetadata(content);

		expect(isOk(result)).toBe(true);
		expect(unwrapOk(result)).toMatchFileSnapshot(
			"./__snapshot__/extract-blog-metadata/valid-blog.txt",
		);
	});
});
