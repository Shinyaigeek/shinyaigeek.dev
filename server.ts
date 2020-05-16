import fastify from "fastify";

import fastifyStatic from "fastify-static";

import React from "react";
import { renderToString } from "react-dom/server";

import marked from "marked";

import Home from "./src/pages/Home";
import Post from "./src/pages/Post";
import Profile from "./src/pages/Profile";

import helmet from "./src/lib/helmet";

import { getBlogPost, getBlogSlug, Entry } from "./src/lib/getBlogPost";
import { getBlogPosts, getHomeSlug } from "./src/lib/getBlogPosts";
import { getSiteMap } from "./src/lib/getSitemap";

import hljs from "highlight.js";
import { getRss } from "./src/lib/getRss";

import path from "path";

import dotenv from "dotenv";

dotenv.config();

const TITLE = "しにゃいの学習帳";

const app = fastify();

app.register(fastifyStatic, {
  root: path.join(__dirname, "./dist"),
});

app.get("/", (req, res) => {
  const slug = getHomeSlug(req.req.url || "");
  getBlogPosts(slug).then((items) => {
    if (!items || items.items.length === 0) {
      app.log.info("some error happens");
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: TITLE,
            children: Home,
            style: "home",
            slug: "https://shinyaigeek.dev",
            props: {
              items: [
                {
                  fields: {
                    title: "Not Found",
                    description: "item is not found",
                    slug: "none",
                    publishedAt: "0000/00/00",
                    tags: [],
                    content: "Item is not found",
                    hasEn: false,
                  },
                },
              ],
            },
          })
        )
      );
      res.headers({
        "content-type": "text/html; charset=utf-8",
      });
      res.send(renderedHtml);
    } else {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: TITLE,
            children: Home,
            style: "home",
            slug: "https://shinyaigeek.dev",
            props: {
              items: items.items,
              prev: items.prev,
              next: items.next,
            },
          })
        )
      );
      res.headers({
        "content-type": "text/html; charset=utf-8",
      });
      res.send(renderedHtml);
    }
  });
});

// Run the server!
app.listen(3000, (err, address) => {
  if (err) throw err;
});
