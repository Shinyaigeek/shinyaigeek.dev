import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { PostIndex } from "../../../ui/pages/PostIndex/PostIndex";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";
import { ThirdPartyPublishContentRepository } from "../../model/third-party-publish/third-party-publish.repository";

export const generateBlogIndexPage: GenerateHandler<Context> = async ({
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

	const thirdPartyPublishContentRepository =
		new ThirdPartyPublishContentRepository(
			fileIOInfrastructure,
			filePathInfrastructure,
		);

	const thirdPartyPublishContentResult =
		await thirdPartyPublishContentRepository.getThirdPartyPublishContents();
	if (isErr(thirdPartyPublishContentResult)) {
		throw unwrapErr(thirdPartyPublishContentResult);
	}
	const thirdPartyPUblishContent = unwrapOk(
		thirdPartyPublishContentResult,
	).sort((l, r) => {
		return l.publishedAt < r.publishedAt ? 1 : -1;
	});

	const blogItems = blogPosts.map((blogPost) => blogPost.metadata);
	const thirdPartyPublishContentItems = thirdPartyPUblishContent.map(
		(thirdPartyPublishContentItem) => {
			return {
				title: thirdPartyPublishContentItem.title,
				description: thirdPartyPublishContentItem.description,
				publishedAt: thirdPartyPublishContentItem.publishedAt.toString(),
				path: thirdPartyPublishContentItem.slug.toString(),
				ogp: thirdPartyPublishContentItem.ogp.toString(),
			};
		},
	);

	const items = [...blogItems, ...thirdPartyPublishContentItems].sort(
		(l, r) => {
			return l.publishedAt < r.publishedAt ? 1 : -1;
		},
	);

	const rawLanguage = language === Language.ja ? "ja" : "en";
	const description =
		language === Language.ja
			? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
			: "shinyaigeek.dev is a tech blog by a web developer. I mainly write about web development.";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			title="shinyaigeek.dev"
			path="/"
			description={description}
			builtAssets={context.builtAssets}
		>
			<Layout language={rawLanguage} page="1" currentPath="/">
				<PostIndex items={items} />
			</Layout>
		</Shell>,
	);
};
