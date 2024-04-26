import type { BlogContent } from "../../model/blog/blog.entity";
import type { BlogRepository } from "../../model/blog/blog.repository";
import { M17NContents } from "../../model/m17n/m17n.entity";

export class GetBlogPostsUsecase {
	constructor(private blogPostRepository: BlogRepository) {}

	async getBlogPosts(): Promise<M17NContents<BlogContent>[]> {
		const blogPosts = await this.blogPostRepository.getBlogs();
		const ja = blogPosts.filter((blogPost) => blogPost.language === "ja");
		const en = blogPosts.filter((blogPost) => blogPost.language === "en");

		return new M17NContents(ja, en);
	}
}
