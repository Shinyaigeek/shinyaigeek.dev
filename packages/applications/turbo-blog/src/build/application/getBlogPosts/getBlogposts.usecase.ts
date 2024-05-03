import type { BlogContent } from "../../model/blog/blog.entity";
import type { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";
import { M17NContents } from "../../model/m17n/m17n.entity";

export class GetBlogPostsUsecase {
	constructor(private blogPostRepository: BlogRepository) {}

	async getBlogPosts(): Promise<M17NContents<BlogContent>[]> {
		const blogPosts = await this.blogPostRepository.getBlogs();
		const ja = blogPosts.filter(
			(blogPost) => blogPost.language === Language.ja,
		);
		const en = blogPosts.filter(
			(blogPost) => blogPost.language === Language.en,
		);

		const contents: M17NContents<BlogContent>[] = [];

		for (const blogPost of ja) {
			const existingContent = en.find(
				(content) => content.metadata.title === blogPost.metadata.title,
			);
			if (existingContent) {
				contents.push(new M17NContents(blogPost, existingContent));
			} else {
				contents.push(new M17NContents(blogPost, undefined));
			}
		}

		for (const blogPost of en) {
			const existingContent = ja.find(
				(content) => content.metadata.title === blogPost.metadata.title,
			);
			if (!existingContent) {
				contents.push(new M17NContents(undefined, blogPost));
			}
		}

		return contents;
	}
}
