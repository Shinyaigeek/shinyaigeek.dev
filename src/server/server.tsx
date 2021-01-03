import fastify from "fastify";

import { getBlogPosts, getHomeSlug } from "./util/getBlogPosts";
import { getBlogPost } from "./util/getBlogPost";
import * as React from "react";
import { renderToStaticNodeStream } from "react-dom/server";
import Post from "../front/Post/Post";
import Home from "../front/Home/Home";
import { Profile } from "../front/Profile/Profile";

import dotenv from "dotenv";
import hljs from "highlight.js";
import helmet from "./util/helmet";
import stream from "stream";

import { getSiteMap } from "./util/getSitemap";
import { getRss } from "./util/getRss";

import { Remarkable } from "remarkable";

dotenv.config();

const app = fastify();

const port = process.env.PORT ?? "8080";

const title = "しにゃいの学習帳";

app.get("/prefetch/post/:slug", async (req, res) => {
  const slug: string = req.params.slug ?? "";
  const post = await getBlogPost(slug);
  res.headers({
    "content-type": "application/json",
  });
  if (post) {
    const md = new Remarkable({
      html: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {}
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}

        return ""; // use external default escaping
      },
    });
    const html = md.render(post.fields.content);

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
  console.log("uuuu");
  const post = await getBlogPost(slug);
  console.log("asdf");
  res.headers({
    "content-type": "text/html; charset=utf-8",
  });
  if (!post) {
    return "not found";
  }

  const md = new Remarkable({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ""; // use external default escaping
    },
  });

  const html = md.render(post.fields.content);

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
  const renderedHtml = renderToStaticNodeStream(
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
  res.raw.write("<!DOCTYPE html>")
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
    ? renderToStaticNodeStream(
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
    : renderToStaticNodeStream(
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
  res.raw.write("<!DOCTYPE html>")
  res.send(renderedHtml);
});

app.get("/profile", (req, res) => {
  const renderedHtml = renderToStaticNodeStream(
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
  res.raw.write("<!DOCTYPE html>")
  res.send(renderedHtml);
});

app.get("/json", async (req, res) => {
  const { tag, page } = req.query as {
    tag?: string;
    page?: string;
  };

  const items = await getBlogPosts({
    slug: "",
    tag,
    page: Number.isInteger(Number(page)) ? Number(page) : undefined,
  });

  return JSON.stringify(items);
});

app.put("/withItems", (req, res) => {
  try {
    const { rawItems } = req.body;
    const items = JSON.parse(rawItems);
    if (!items || items.items.length === 0) {
      const renderedHtml = renderToStaticNodeStream(
        React.createElement(
          helmet({
            title: title,
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
      res.raw.write("<!DOCTYPE html>")
      res.send(renderedHtml);
    } else {
      const renderedHtml = renderToStaticNodeStream(
        React.createElement(
          helmet({
            title: title,
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
      res.raw.write("<!DOCTYPE html>")
      res.send(renderedHtml);
    }
  } catch (_) {
    console.log(_);
    res.send("oops");
  }
});

app.put("/renderWithItem", (req, res) => {
  try {
    const { rawItem } = req.body;
    const item = JSON.parse(rawItem).items[0];
    if (!item) {
      const renderedHtml = renderToStaticNodeStream(
        React.createElement(
          helmet({
            title: `Not Found | ${title}`,
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
      res.raw.write("<!DOCTYPE html>")
      res.send(renderedHtml);
    } else {
      const md = new Remarkable({
        html: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (err) {}
          }

          try {
            return hljs.highlightAuto(str).value;
          } catch (err) {}

          return ""; // use external default escaping
        },
      });
      const html = md.render(item.fields.content);
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
      const renderedHtml = renderToStaticNodeStream(
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
      res.raw.write("<!DOCTYPE html>")
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
        res.send(xml);
      })
      .catch((e) => {
        throw new Error();
      });
  } catch (e) {
    res.send("oops");
  }
});

app.listen(Number(port), "0.0.0.0", (err, address) => {
  if (err) throw err;
  console.log("server runs at" + port + "/" + address);
});
