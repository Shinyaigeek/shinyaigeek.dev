import type { FastifyPluginAsync } from "fastify";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TopPageComponent } from "../../ui/pages/top/top";

export const TopPageRoutes: FastifyPluginAsync = async (app) => {
	app.get("/", async (req, res) => {
		const html = renderToStaticMarkup(
			<TopPageComponent allProjects={["prerender2"]} />,
		);

		res.type("text/html");
		res.send(html);
	});
};
