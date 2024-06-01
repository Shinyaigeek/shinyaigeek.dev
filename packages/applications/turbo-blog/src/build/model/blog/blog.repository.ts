import type fs from "node:fs/promises";
import type path from "node:path";
import {
	type Result,
	createErr,
	createOk,
	isErr,
	unwrapErr,
	unwrapOk,
} from "option-t/esm/PlainResult";
import { Language } from "../language/language.entity";
import { BlogContent } from "./blog.entity";
import { parseBlogContent } from "./parse-blog-content";

export class BlogRepository {
	private _fs: typeof fs;
	private _path: typeof path;

	constructor(injectedFs: typeof fs, injectedPath: typeof path) {
		this._fs = injectedFs;
		this._path = injectedPath;
	}

	public async getBlog(
		slug: string,
		language: Language,
	): Promise<Result<BlogContent, Error>> {
		const blogPath = this._path.resolve(
			process.cwd(),
			"src/articles/",
			language === Language.ja ? "public" : "en",
			`${slug}`,
		);
		const blogContent = await this._fs.readFile(blogPath, "utf-8");

		const parseBlogContentResult = await parseBlogContent(blogContent);

		if (isErr(parseBlogContentResult)) {
			return parseBlogContentResult;
		}

		const { metadata, body } = unwrapOk(parseBlogContentResult);

		return createOk(new BlogContent(metadata, body, language));
	}

	public async getBlogs(
		language: Language,
	): Promise<Result<BlogContent[], Error>> {
		const blogPaths = await this._fs.readdir(
			this._path.resolve(
				process.cwd(),
				language === Language.ja ? "src/articles/public" : "src/articles/en",
			),
		);

		const blogResults = await Promise.all(
			blogPaths.map(async (blogPath) => {
				return this.getBlog(blogPath, language);
			}),
		);

		const blogErrs = blogResults.filter(isErr);

		if (blogErrs.length > 0) {
			return createErr(AggregateError(blogErrs.map(unwrapErr)));
		}

		return createOk(blogResults.map(unwrapOk));
	}
}
