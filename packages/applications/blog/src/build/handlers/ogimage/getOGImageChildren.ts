import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";

export const getJapaneseOGImageChildren: () => Promise<string[]> = async () => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const blogRepository = new BlogRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const blogPostsUsecase = new GetBlogPostsUsecase(blogRepository);

	const blogPostResults = await blogPostsUsecase.getBlogPosts(Language.ja);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	return unwrapOk(blogPostResults).map((blogPost) => {
		return `/post/${blogPost.metadata.path}/ogp.png`;
	});
};

export const getEnglishOGImageChildren: () => Promise<string[]> = async () => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const blogRepository = new BlogRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const blogPostsUsecase = new GetBlogPostsUsecase(blogRepository);

	const blogPostResults = await blogPostsUsecase.getBlogPosts(Language.en);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	return unwrapOk(blogPostResults).map((blogPost) => {
		return `/en/post/${blogPost.metadata.path}/ogp.png`;
	});
};
