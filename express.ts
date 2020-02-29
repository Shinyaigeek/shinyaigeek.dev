import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";

import Home from "./src/pages/Home";
import Post from "./src/pages/Post";
import Profile from "./src/pages/Profile";

import helmet from "./src/lib/helmet";

import { getBlogPost, getBlogSlug, Entry } from "./src/lib/getBlogPost";
import { getBlogPosts, getHomeSlug } from "./src/lib/getBlogPosts";

const app = express();

app.use(express.static("public"))

app.get("/", (req, res) => {
  const slug = getHomeSlug(req.url);
  getBlogPosts(slug).then(item => {
    if (!item || item.length === 0) {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: "home",
            children: Home,
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
            title: "Home",
            children: Home,
            props: {
              items: item
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
            title: "post",
            children: Post,
            props: {
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
          })
        )
      );
      res.send(renderedHtml);
    } else {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: "post",
            children: Post,
            props: item
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
        title: "profile",
        children: Profile
      })
    )
  );
  res.send(renderedHtml);
});

app.listen(3000);
