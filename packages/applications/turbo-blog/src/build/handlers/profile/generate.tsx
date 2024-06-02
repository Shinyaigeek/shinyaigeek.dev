import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Profile } from "../../../ui/pages/Profile/Profile";
import type { Context } from "../../context/context";
import { Language } from "../../model/language/language.entity";
import { Shell } from "../../util/helmet";

export const generateProfilePage: GenerateHandler<Context> = async ({
	context,
}) => {
	const rawLanguage = context.language === Language.ja ? "ja" : "en";

	return renderToStaticMarkup(
		<Shell language={rawLanguage} which="TODO" title="shinyaigeek.dev" slug="/">
			<Layout language={rawLanguage} page="1" currentPath="/">
				<Profile />
			</Layout>
		</Shell>,
	);
};
