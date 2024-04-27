import { renderToStaticMarkup } from "react-dom/server";
import { Home } from "../../../ui/pages/Home/Home";

export const generateIndexPage: () => Promise<string> = async () => {
	return renderToStaticMarkup(<Home />);
};
