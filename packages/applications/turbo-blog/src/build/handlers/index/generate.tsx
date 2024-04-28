import { renderToStaticMarkup } from "react-dom/server";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Home } from "../../../ui/pages/Home/Home";

export const generateIndexPage: () => Promise<string> = async () => {
	return renderToStaticMarkup(
		<Layout language="ja" page="1" currentPath="/">
			<Home />
		</Layout>,
	);
};
