import type { Result } from "option-t/esm/PlainResult";
import type { BlogContent } from "../../model/blog/blog.entity";
import type { BlogRepository } from "../../model/blog/blog.repository";
import type { Language } from "../../model/language/language.entity";

export class GetBlogPostsUsecase {
	constructor(private blogPostRepository: BlogRepository) {}

	async getBlogPosts(
		language: Language,
	): Promise<Result<BlogContent[], Error>> {
		const blogPosts = await this.blogPostRepository.getBlogs(language);

		return blogPosts;
	}
}
