import fastify from "fastify";

import { getBlogPosts, getHomeSlug } from "./util/getBlogPosts";
import { getBlogPost } from "./util/getBlogPost";
import * as React from "react";
import { renderToString } from "react-dom/server";
import Post from "../front/Post/Post";
import Home from "../front/Home/Home";
import { Profile } from "../front/Profile/Profile";

import dotenv from "dotenv";
import marked from "marked";
import helmet from "./util/helmet";

//@ts-ignore
import register from "@babel/register";

register({
  presets: ["react"],
});

dotenv.config();

const app = fastify();

const port = process.env.SERVER_PORT ?? "8080";

const title = "しにゃいの学習帳";

app.get("/prefetch/post/:slug", async (req, res) => {
  const slug: string = req.params.slug ?? "";
  const post = await getBlogPost(slug);
  res.headers({
    "content-type": "application/json",
  });
  if (post) {
    const html = marked(post.fields.content);

    const anchorsWithH2: string[] | null = html.match(
      /<h2 id=".+?">.+?<\/h2>/g
    );
    let anchors;
    if (anchorsWithH2) {
      anchors = anchorsWithH2.map((anc) => {
        return anc.replace(/<h2 id=".+?">/, "").replace("</h2>", "");
      });
    }
    const body = html.replace(/<h2 id=".+?">/g, (target: string) => {
      const id = target.replace('<h2 id="', "").replace('">', "");
      return `<h2 id="${encodeURI(id)}">`;
    });
    const pro = {
      fields: {
        title: post.fields.title,
        description: post.fields.description,
        tags: post.fields.tags,
        publishedAt: post.fields.publishedAt,
        hasEn: post.fields.hasEn,
        content: body,
        slug: post.fields.slug,
      },
      anchors: anchors,
    };
    res.send(JSON.stringify(pro));
  }
});

app.get("/prefetch/home", async (req, res) => {
  const { tag, page } = req.query as {
    tag?: string;
    page?: string;
  };

  const posts = await getBlogPosts({
    slug: "",
    tag,
    page: Number.isInteger(Number(page)) ? Number(page) : undefined,
  });

  res.send(JSON.stringify(posts));
});

app.get("/post/:slug", async (req, res) => {
  const slug: string = req.params.slug ?? "";
  const post = await getBlogPost(slug);
  res.headers({
    "content-type": "text/html; charset=utf-8",
  });
  if (!post) {
    return "not found";
  }

  const html = marked(post.fields.content);

  const anchorsWithH2: string[] | null = html.match(/<h2 id=".+?">.+?<\/h2>/g);
  let anchors;
  if (anchorsWithH2) {
    anchors = anchorsWithH2.map((anc) => {
      return anc.replace(/<h2 id=".+?">/, "").replace("</h2>", "");
    });
  }
  const body = html.replace(/<h2 id=".+?">/g, (target: string) => {
    const id = target.replace('<h2 id="', "").replace('">', "");
    return `<h2 id="${encodeURI(id)}">`;
  });
  const pro = {
    fields: {
      title: post.fields.title,
      description: post.fields.description,
      tags: post.fields.tags,
      publishedAt: post.fields.publishedAt,
      hasEn: post.fields.hasEn,
      content: body,
      slug: post.fields.slug,
    },
    anchors: anchors,
  };
  const renderedHtml = renderToString(
    React.createElement(
      helmet({
        title: `${pro.fields.title} | ${title}`,
        style: "post",
        slug: `https://shinyaigeek.dev/${pro.fields.slug}`,
        children: Post,
        props: pro,
      })
    )
  );

  res.send(renderedHtml);
});

app.get("/", async (req, res) => {
  const { tag, page } = req.query as {
    tag?: string;
    page?: string;
  };

  const posts = await getBlogPosts({
    slug: "",
    tag,
    page: Number.isInteger(Number(page)) ? Number(page) : undefined,
  });

  const renderedHtml = posts
    ? renderToString(
        React.createElement(
          helmet({
            title: title,
            children: Home,
            style: "home",
            slug: "https://shinyaigeek.dev",
            props: {
              items: posts.items,
              prev: posts.prev,
              next: posts.next,
            },
          })
        )
      )
    : renderToString(
        React.createElement(
          helmet({
            title: title,
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
});

app.get("/profile", (req, res) => {
  const renderedHtml = renderToString(
    React.createElement(
      helmet({
        title: `Profile | ${title}`,
        style: "profile",
        children: Profile,
        slug: "https://shinyaigeek.dev/profile",
      })
    )
  );
  res.headers({
    "content-type": "text/html; charset=utf-8",
  });
  res.send(renderedHtml);
});

const VERCEL = process.env.VERCEL;

if (typeof VERCEL === "undefined") {
  app.listen(port, (err, address) => {
    if (err) throw err;
  });
}

module.exports = app;
