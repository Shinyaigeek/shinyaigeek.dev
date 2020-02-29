import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";

import Home from "./src/pages/Home";
import Post from "./src/pages/Post";
import Profile from "./src/pages/Profile";

import helmet from "./src/lib/helmet";

import { getBlogPost, getBlogSlug, Entry } from "./src/lib/getBlogPost";

const app = express();

app.get("/", (req, res) => {
  const renderedHtml = renderToString(
    React.createElement(
      helmet({
        title: "home",
        children: Home
      })
    )
  );
  res.send(renderedHtml);
});

app.get("/post/:id", (req, res) => {
  const slug = getBlogSlug(req.url);
  getBlogPost(slug).then((item) => {
    if(!item) {
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

    }else{
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
  })
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
