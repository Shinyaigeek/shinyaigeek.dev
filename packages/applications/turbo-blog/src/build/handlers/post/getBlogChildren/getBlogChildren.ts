import fs from "node:fs/promises";
import nodePath from "node:path";
import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { GetBlogPostsUsecase } from "../../../application/getBlogPosts/getBlogposts.usecase";
import { BlogRepository } from "../../../model/blog/blog.repository";
import { Language } from "../../../model/language/language.entity";

export const getJapaneseBlogChildren: () => Promise<string[]> = async () => {
	const blogRepository = new BlogRepository(fs, nodePath);
	const blogPostsUsecase = new GetBlogPostsUsecase(blogRepository);

	const blogPostResults = await blogPostsUsecase.getBlogPosts(Language.ja);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	return unwrapOk(blogPostResults).map((blogPost) => {
		return `/post/${blogPost.metadata.path}`;
	});
};
