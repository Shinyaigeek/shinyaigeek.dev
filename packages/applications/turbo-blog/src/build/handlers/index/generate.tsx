import fs from "node:fs/promises";
import nodePath from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Home } from "../../../ui/pages/Home/Home";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import type { Context } from "../../context/context";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Shell } from "../../util/helmet";

export const generateIndexPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const blogRepository = new BlogRepository(fs, nodePath);
	const getblogPostsUsecase = new GetBlogPostsUsecase(blogRepository);
	const blogPosts = await getblogPostsUsecase.getBlogPosts();
	const language = context.language;

	return renderToStaticMarkup(
		<Shell language={language} which="TODO" title="shinyaigeek.dev" slug="/">
			<Layout language={language} page="1" currentPath="/">
				<Home />
			</Layout>
		</Shell>,
	);
};
