import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { Home } from "../../../ui/pages/Home/Home";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";

export const generateIndexPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const blogRepository = new BlogRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const getblogPostsUsecase = new GetBlogPostsUsecase(blogRepository);
	const language = context.language;
	const blogPostResults = await getblogPostsUsecase.getBlogPosts(language);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	const blogPosts = unwrapOk(blogPostResults).sort((l, r) => {
		return l.metadata.publishedAt < r.metadata.publishedAt ? 1 : -1;
	});

	const rawLanguage = language === Language.ja ? "ja" : "en";
	const description =
		language === Language.ja
			? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
			: "shinyaigeek.dev is a tech blog by a web developer. I mainly write about web development.";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			ogImageFilename="TODO"
			title="shinyaigeek.dev"
			path="/"
			description={description}
		>
			<Layout language={rawLanguage} page="1" currentPath="/">
				<Home items={blogPosts.map((blogPost) => blogPost.metadata)} />
			</Layout>
		</Shell>,
	);
};
