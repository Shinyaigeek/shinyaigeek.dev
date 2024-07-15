import { type Result, isErr } from "option-t/esm/PlainResult";
import type { BlogContent } from "../../model/blog/blog.entity";
import type { BlogRepository } from "../../model/blog/blog.repository";
import type { Language } from "../../model/language/language.entity";

export class GetBlogPostUsecase {
	constructor(private blogPostRepository: BlogRepository) {}

	async getBlogPost(
		id: string,
		language: Language,
	): Promise<Result<BlogContent, Error>> {
		const blogPostResult = await this.blogPostRepository.getBlog(
			id.replace("/post/", ""),
			language,
		);

		if (isErr(blogPostResult)) {
			return blogPostResult;
		}

		return blogPostResult;
	}
}
