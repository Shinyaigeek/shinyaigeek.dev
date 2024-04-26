import type { BlogContent } from "../../model/blog/blog.entity";
import type { BlogRepository } from "../../model/blog/blog.repository";
import { M17NContents } from "../../model/m17n/m17n.entity";

export class GetBlogPostUsecase {
	constructor(private blogPostRepository: BlogRepository) {}

	async getBlogPost(id: string): Promise<M17NContents<BlogContent>> {
		const [ja, en] = await Promise.all([
			this.blogPostRepository.getBlog(id, "ja"),
			this.blogPostRepository.getBlog(id, "en"),
		]);

		return new M17NContents(ja, en);
	}
}
