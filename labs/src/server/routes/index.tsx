import React from "react";
import { type FastifyPluginAsync } from "fastify";
import { renderToStaticMarkup } from "react-dom/server";
import { TopPageComponent } from "../../ui/pages/top/top";

export const TopPageRoutes: FastifyPluginAsync = async function (app) {
  app.get("/", async (req, res) => {
    const html = renderToStaticMarkup(
      <TopPageComponent allProjects={["prerender2"]} />
    );

    res.send(html);
  });
};
