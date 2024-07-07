import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { Profile } from "../../../ui/pages/Profile/Profile";
import type { Context } from "../../context/context";
import { Language } from "../../model/language/language.entity";

export const generateProfilePage: GenerateHandler<Context> = async ({
	context,
}) => {
	const rawLanguage = context.language === Language.ja ? "ja" : "en";
	const description =
		context.language === Language.ja
			? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
			: "shinyaigeek.dev is a tech blog by a web developer. I mainly write about web development.";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			which="TODO"
			title="shinyaigeek.dev"
			path="/profile"
			description={description}
		>
			<Layout language={rawLanguage} page="1" currentPath="/">
				<Profile />
			</Layout>
		</Shell>,
	);
};
