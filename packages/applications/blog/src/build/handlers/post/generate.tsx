import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { PostIndex } from "../../../ui/pages/PostIndex/PostIndex";
import { getRecentItems } from "../../application/getRecentItems/getRecentItems";
import type { Context } from "../../context/context";
import { Language } from "../../model/language/language.entity";

export const generateBlogIndexPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const items = await getRecentItems(language);

	const rawLanguage = language === Language.ja ? "ja" : "en";
	// This page used to describe itself as the home page: same title, and
	// path="/", which made og:url and the OG image point at "/" instead of here.
	const description =
		language === Language.ja
			? "shinyaigeek.dev の記事一覧. 主に web 開発の知見について書いています"
			: "Every post on shinyaigeek.dev. I mainly write about web development.";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			title="Posts | shinyaigeek.dev"
			path="/post/"
			description={description}
			builtAssets={context.builtAssets}
		>
			<Layout language={rawLanguage} page="post" currentPath="/post/">
				<PostIndex items={items} />
			</Layout>
		</Shell>,
	);
};
