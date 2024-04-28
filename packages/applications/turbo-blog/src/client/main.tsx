import { hydrate } from "react-dom";
import { Layout } from "../ui/components/Layout/Layout";
import { Home } from "../ui/pages/Home/Home";

hydrate(
	<Layout language="ja" page="1" currentPath="/">
		<Home />
	</Layout>,
	document.getElementById("_app"),
);
