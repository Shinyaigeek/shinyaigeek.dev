import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import type { GenerateHandler } from "ssg-router";
import { GetBlogPostUsecase } from "../../application/getBlogPost/getBlogPost.usecase";
import { GetFleetUsecase } from "../../application/getFleet/getFleet.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { FleetRepository } from "../../model/fleet/fleet.repository";
import { sitePath } from "../site-path";
import { generateOGImageFromBlogPost } from "./generateOGImageFromBlogPost";

/**
 * The path of the page an "…/ogp.png" route illustrates: the language prefix and
 * the file name both come off, leaving the route the image belongs to.
 *
 * Both ends are anchored. An unanchored replace("/en", "") also eats the "/en"
 * inside a slug -- "/post/enumerable/ogp.png" became "/postumerable" -- which
 * then failed to resolve to any article.
 */
const imageSubjectPath = (path: string) =>
	sitePath(path).replace(/\/ogp\.png$/, "");

export const generateTopOGImagePage: GenerateHandler<Context> = async () => {
	const pngBuffer = await generateOGImageFromBlogPost({
		title: "Shinyaigeek's blog",
	});
	return pngBuffer;
};

export const generateProfileOGImagePage: GenerateHandler<
	Context
> = async () => {
	const pngBuffer = await generateOGImageFromBlogPost({
		title: "About Shinyaigeek",
	});
	return pngBuffer;
};

export const generateActivityOGImagePage: GenerateHandler<
	Context
> = async () => {
	const pngBuffer = await generateOGImageFromBlogPost({
		title: "Shinyaigeek's GitHub Activity",
	});
	return pngBuffer;
};

export const generateBlogIndexOGImagePage: GenerateHandler<
	Context
> = async () => {
	const pngBuffer = await generateOGImageFromBlogPost({
		title: "Shinyaigeek's blog posts",
	});
	return pngBuffer;
};

export const generateFleetsOGImagePage: GenerateHandler<Context> = async () => {
	const pngBuffer = await generateOGImageFromBlogPost({
		title: "Shinyaigeek's fleets",
	});
	return pngBuffer;
};

export const generateFleetOGImagePage: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	const slug = imageSubjectPath(path).split("/").pop();
	if (!slug) {
		throw new Error(`Cannot derive a fleet slug from ${path}`);
	}

	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const fleetRepository = new FleetRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);

	const fleetResult = await new GetFleetUsecase(fleetRepository).getFleet(
		slug,
		context.language,
	);
	if (isErr(fleetResult)) {
		throw unwrapErr(fleetResult);
	}

	return generateOGImageFromBlogPost({
		title: unwrapOk(fleetResult).metadata.title,
	});
};

export const generateBlogPostOGImagePage: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	const slug = imageSubjectPath(path);

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
