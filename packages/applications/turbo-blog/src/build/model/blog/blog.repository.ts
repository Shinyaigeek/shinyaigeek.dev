import {
	type Result,
	createErr,
	createOk,
	isErr,
	unwrapErr,
	unwrapOk,
} from "option-t/esm/PlainResult";
import type { FileIOInfrastructureInterface } from "../../infrastructure/file-io/file-io.interface";
import type { FilePathInfrastructureInterface } from "../../infrastructure/file-path/file-path.interface";
import { Language } from "../language/language.entity";
import { BlogContent } from "./blog.entity";
import { parseBlogContent } from "./parse-blog-content";

export class BlogRepository {
	constructor(
		private fileIOInfrastructure: FileIOInfrastructureInterface,
		private filePathInfrastructure: FilePathInfrastructureInterface,
	) {}

	public async getBlog(
		slug: string,
		language: Language,
	): Promise<Result<BlogContent, Error>> {
		const blogPath = this.filePathInfrastructure.resolve(
			process.cwd(),
			"src/articles/",
			language === Language.ja ? "public" : "en",
			`${slug}.md`,
		);
		const blogContent = await this.fileIOInfrastructure.readFile(blogPath);

		const parseBlogContentResult = await parseBlogContent(blogContent);

		if (isErr(parseBlogContentResult)) {
			return parseBlogContentResult;
		}

		const { metadata, body } = unwrapOk(parseBlogContentResult);

		return createOk(
			new BlogContent(
				{ ...metadata, path: slug.replace(".md", "") },
				body,
				language,
			),
		);
	}

	public async getBlogs(
		language: Language,
	): Promise<Result<BlogContent[], Error>> {
		const blogPaths = (
			await this.fileIOInfrastructure.readDirectory(
				this.filePathInfrastructure.resolve(
					process.cwd(),
					language === Language.ja ? "src/articles/public" : "src/articles/en",
				),
			)
		).map((blogPath) => blogPath.replace(".md", ""));

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
