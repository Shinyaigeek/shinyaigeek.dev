import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Layout } from "../ui/components/Layout/Layout";
import { Home } from "../ui/pages/Home/Home";
import { renderToStaticMarkup } from "./renderer/renderer";

const app = new Hono();
app.get("/", async (c) => {
	const stream = await renderToStaticMarkup(
		<Layout language="ja" page="1" currentPath="/">
			<Home />
		</Layout>,
		{},
	);

	return c.text(stream);
});

serve(app);
