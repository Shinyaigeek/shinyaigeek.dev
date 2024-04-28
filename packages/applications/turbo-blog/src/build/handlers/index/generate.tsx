import { renderToStaticMarkup } from "react-dom/server";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Home } from "../../../ui/pages/Home/Home";
import { Shell } from "../../util/helmet";

export const generateIndexPage: () => Promise<string> = async () => {
	return renderToStaticMarkup(
		<Shell language="ja" which="TODO" title="shinyaigeek.dev" slug="/">
			<Layout language="ja" page="1" currentPath="/">
				<Home />
			</Layout>
		</Shell>,
	);
};
