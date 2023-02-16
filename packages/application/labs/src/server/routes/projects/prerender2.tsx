import React from "react";
import { type FastifyPluginAsync } from "fastify";
import { renderToStaticMarkup } from "react-dom/server";
import { Prerender2PageComponent } from "../../../ui/pages/projects/prerender2/prerender2";
import { Prerender2SubPageComponent } from "../../../ui/pages/projects/prerender2/subpage";

export const Prerender2ProjectPageRoutes: FastifyPluginAsync = async function (
  app
) {
  app.get("/projects/prerender2/", async (req, res) => {
    const html = renderToStaticMarkup(<Prerender2PageComponent />);

    res.type("text/html");
    res.send(html);
  });

  app.get("/projects/prerender2/subpage/", async (req, res) => {
    const html = renderToStaticMarkup(<Prerender2SubPageComponent />);

    res.type("text/html");
    res.send(html);
  });
};
