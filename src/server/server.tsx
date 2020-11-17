import fastify from "fastify";

import { getBlogPosts, getHomeSlug } from "./util/getBlogPosts";
import { getBlogPost } from "./util/getBlogPost";
import * as React from "react";
import { renderToString } from "react-dom/server";
import Post from "../front/Post/Post";

// const Post = () => (
//   <div className="post">
//     asdf
//   </div>
// );

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
  res.send(JSON.stringify(post));
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

app.listen(port, (err, address) => {
  if (err) throw err;
});
