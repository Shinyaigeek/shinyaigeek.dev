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

app.get("/json", (req, res) => {
  const slug = getHomeSlug(req.req.url || "");
  getBlogPosts(slug).then((items) => {
    res.headers({
      "content-type": "application/json",
    });
    res.send(JSON.stringify(items));
  });
});

app.get("/post/:id", (req, res) => {
  const slug = getBlogSlug(req.req.url || "");
  getBlogPost(slug).then((item) => {
    if (!item) {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: `Not Found | ${TITLE}`,
            children: Post,
            style: "post",
            slug: "https://shinyaigeek.dev",
            props: {
              fields: {
                title: "Not Found",
                description: "item is not found",
                slug: "none",
                publishedAt: "0000/00/00",
                tags: [],
                content: "Item is not found",
                hasEn: false,
              },
              anchors: [],
            },
          })
        )
      );
      res.headers({
        "content-type": "text/html; charset=utf-8",
      });
      res.send(renderedHtml);
    } else {
      marked.setOptions({
        langPrefix: "",
        highlight: (code, lang) => {
          return hljs.highlightAuto(code, [lang]).value;
        },
      });
      const html = marked(item.fields.content);
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
          title: item.fields.title,
          description: item.fields.description,
          tags: item.fields.tags,
          publishedAt: item.fields.publishedAt,
          hasEn: item.fields.hasEn,
          content: body,
          slug: item.fields.slug,
        },
        anchors: anchors,
      };
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: `${pro.fields.title} | ${TITLE}`,
            style: "post",
            slug: `https://shinyaigeek.dev/${pro.fields.slug}`,
            children: Post,
            props: pro,
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

app.get("/profile", (req, res) => {
  const renderedHtml = renderToString(
    React.createElement(
      helmet({
        title: `Profile | ${TITLE}`,
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

app.put("/withItems", (req, res) => {
  try {
    const { rawItems } = req.body;
    const items = JSON.parse(rawItems);
    if (!items || items.items.length === 0) {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: TITLE,
            children: Home,
            style: "home",
            slug: "https://shinyaigeek.dev/",
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
            slug: "https://shinyaigeek.dev/",
            style: "home",
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
  } catch (_) {
    console.log(_);
    res.send("oops");
  }
});

app.put("/renderWithItem", (req, res) => {
  console.log("--------------------------");
  console.log(
    "=========== access post to render with Data Json =============="
  );
  try {
    const { rawItem } = req.body;
    const item = JSON.parse(rawItem).items[0];
    if (!item) {
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: `Not Found | ${TITLE}`,
            children: Post,
            style: "post",
            slug: "https://shinyaigeek.dev",
            props: {
              fields: {
                title: "Not Found",
                description: "item is not found",
                slug: "none",
                publishedAt: "0000/00/00",
                tags: [],
                content: "Item is not found",
                hasEn: false,
              },
              anchors: [],
            },
          })
        )
      );
      res.headers({
        "content-type": "text/html; charset=utf-8",
      });
      res.send(renderedHtml);
    } else {
      marked.setOptions({
        langPrefix: "",
        highlight: (code, lang) => {
          return hljs.highlightAuto(code, [lang]).value;
        },
      });
      const html = marked(item.fields.content);
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
          title: item.fields.title,
          description: item.fields.description,
          tags: item.fields.tags,
          publishedAt: item.fields.publishedAt,
          hasEn: item.fields.hasEn,
          content: body,
          slug: item.fields.slug,
        },
        anchors: anchors,
      };
      const renderedHtml = renderToString(
        React.createElement(
          helmet({
            title: `${pro.fields.title} | ${TITLE}`,
            style: "post",
            slug: `https://shinyaigeek.dev/${pro.fields.slug}`,
            children: Post,
            props: pro,
          })
        )
      );
      res.headers({
        "content-type": "text/html; charset=utf-8",
      });
      res.send(renderedHtml);
    }
  } catch (_) {
    console.log(_);
    res.send("oops");
  }
});

app.get("/getSitemap", (req, res) => {
  try {
    getSiteMap()
      .then((xml) => {
        res.headers({
          "content-type": "text/xml; charset=utf-8",
        });
        res.send(xml);
      })
      .catch((e) => {
        throw new Error();
      });
  } catch (e) {
    res.send("oops");
  }
});

app.get("/getRss", (req, res) => {
  try {
    getRss()
      .then((xml) => {
        res.headers({
          "content-type": "text/xml; charset=utf-8",
        });
        res.send(xml);
      })
      .catch((e) => {
        throw new Error();
      });
  } catch (e) {
    res.send("oops");
  }
});
// Run the server!
app.listen(8080, (err, address) => {
  if (err) throw err;
});
