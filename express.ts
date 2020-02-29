import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";

import Home from "./src/pages/Home";
import Post from "./src/pages/post";
import Profile from "./src/pages/profile";

import helmet from "./src/lib/helmet"

const app = express();

app.get("/", (req, res) => {
  const renderedHtml = renderToString(React.createElement(helmet({
    title:  "home",
    children: Home()
  })));
  res.send(renderedHtml);
});

app.get("/post", (req, res) => {
  const renderedHtml = renderToString(React.createElement(helmet({
    title:  "post",
    children: Post()
  })));
  res.send(renderedHtml);
});

app.get("/profile", (req, res) => {
  const renderedHtml = renderToString(React.createElement(helmet({
    title:  "profile",
    children: Profile()
  })));
  res.send(renderedHtml);
});

app.listen(3000);
