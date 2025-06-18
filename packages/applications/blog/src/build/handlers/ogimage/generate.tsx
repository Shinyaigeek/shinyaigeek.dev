import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import type { GenerateHandler } from "ssg-router";
import { GetBlogPostUsecase } from "../../application/getBlogPost/getBlogPost.usecase";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { generateOGImageFromBlogPost } from "./generateOGImageFromBlogPost";

export const generateTopOGImagePage: GenerateHandler<Context> = async () => {
	const pngBuffer = await generateOGImageFromBlogPost({
		title: "Shinyaigeek's blog",
	});
	return pngBuffer;
};

export const generateProfileOGImagePage: GenerateHandler<Context> =
	async () => {
		const pngBuffer = await generateOGImageFromBlogPost({
			title: "About Shinyaigeek",
		});
		return pngBuffer;
	};

export const generateBlogPostOGImagePage: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	const slug = path.replace("/en", "").replace("/ogp.png", "");

	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const blogRepository = new BlogRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const getBlogPostUsecase = new GetBlogPostUsecase(blogRepository);

	const blogPostResult = await getBlogPostUsecase.getBlogPost(
		`${slug}`,
		context.language,
	);

	if (isErr(blogPostResult)) {
		throw unwrapErr(blogPostResult);
	}

	const blogPost = unwrapOk(blogPostResult);
	const pngBuffer = await generateOGImageFromBlogPost({
		title: blogPost.metadata.title,
	});

	return pngBuffer;
};
