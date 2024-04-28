import { hydrateRoot } from "react-dom/client";
import { Layout } from "../ui/components/Layout/Layout";
import { Home } from "../ui/pages/Home/Home";

const container = document.getElementById("_app");

if (!container) {
	throw new Error("No _app element found");
}

hydrateRoot(
	container,
	<Layout language="ja" page="1" currentPath="/">
		<Home />
	</Layout>,
);
