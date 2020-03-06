import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";

import marked from "marked";

import Home from "./src/pages/Home";
import Post from "./src/pages/Post";
import Profile from "./src/pages/Profile";

import helmet from "./src/lib/helmet";

import { getBlogPost, getBlogSlug, Entry } from "./src/lib/getBlogPost";
import { getBlogPosts, getHomeSlug } from "./src/lib/getBlogPosts";

const TITLE = "しにゃいの学習帳"

const app = express();

app.use(express.static("public"));
app.use(express.static("static"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  const slug = getHomeSlug(req.url);
  getBlogPosts(slug).then(items => {
    if (!items || items.items.length === 0) {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: TITLE,
            children: Home,
            style: "home",
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
                    hasEn: false
                  }
                }
              ]
            }
          })
        )
      );
      res.send(renderedHtml);
    } else {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: TITLE,
            children: Home,
            style: "home",
            props: {
              items: items.items,
              prev: items.prev,
              next: items.next
            }
          })
        )
      );
      res.send(renderedHtml);
    }
  });
});

app.get("/post/:id", (req, res) => {
  const slug = getBlogSlug(req.url);
  getBlogPost(slug).then(item => {
    if (!item) {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: `Not Found | ${TITLE}`,
            children: Post,
            style: "post",
            props: {
              fields: {
                title: "Not Found",
                description: "item is not found",
                slug: "none",
                publishedAt: "0000/00/00",
                tags: [],
                content: "Item is not found",
                hasEn: false
              },
              anchors: []
            }
          })
        )
      );
      res.send(renderedHtml);
    } else {
      const html = marked(item.fields.content);
      const anchorsWithH2: string[] | null = html.match(
        /<h2 id=".+?">.+?<\/h2>/g
      );
      let anchors;
      if (anchorsWithH2) {
        anchors = anchorsWithH2.map(anc => {
          return anc.replace(/<h2 id=".+?">/, "").replace("</h2>", "");
        });
      }
      const body = html.replace(/<h2 id=".+?">/g, (target: string) => {
        const id = target.replace('<h2 id="', "").replace('">', "");
        return `<h2 id="${encodeURI(id)}">`;
      });
      const pro = {
        fields: {
          title: item.fields.title,
          description: item.fields.description,
          tags: item.fields.tags,
          publishedAt: item.fields.publishedAt,
          hasEn: item.fields.hasEn,
          content: body
        },
        anchors: anchors
      };
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: `${pro.fields.title} | ${TITLE}`,
            style: "post",
            children: Post,
            props: pro
          })
        )
      );
      res.send(renderedHtml);
    }
  });
});

app.get("/profile", (req, res) => {
  const renderedHtml = renderToString(
    React.createElement(
      helmet({
        title: `Profile | ${TITLE}`,
        style: "profile",
        children: Profile
      })
    )
  );
  res.send(renderedHtml);
});

app.listen(8080);
