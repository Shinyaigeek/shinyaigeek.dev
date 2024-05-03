import fs from "node:fs/promises";
import nodePath from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Home } from "../../../ui/pages/Home/Home";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Shell } from "../../util/helmet";

export const generateIndexPage: () => Promise<string> = async () => {
	const blogRepository = new BlogRepository(fs, nodePath);
	const getblogPostsUsecase = new GetBlogPostsUsecase(blogRepository);
	const blogPosts = await getblogPostsUsecase.getBlogPosts();

	return renderToStaticMarkup(
		<Shell language="ja" which="TODO" title="shinyaigeek.dev" slug="/">
			<Layout language="ja" page="1" currentPath="/">
				<Home />
			</Layout>
		</Shell>,
	);
};
