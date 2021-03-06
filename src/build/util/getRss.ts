import dotenv from "dotenv";
import fetch from "node-fetch";
import { getBlogPosts, __getBlogPosts } from "./getBlogPosts";
import path from "path";
dotenv.config();

export const getRss = () => {
  const items = __getBlogPosts(
    path.join(__dirname, "../../articles/public/") as `${string}/`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
            <rss version='2.0'  xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
            <atom:link href="https://shinyaigeek.dev/getRss" rel="self" type="application/rss+xml" />
            <title>shinyaigeek.dev</title>
            <link>https://shinyaigeek.dev/</link>
            <description>見習いWeb developer兼大学生のブログ. 主にweb開発の知見について喋ります</description>
            <language>ja</language>
            <copyright>(C) Shinyaigeek All Rights Reserved.</copyright>
            <managingEditor>me@shinyaigeek.dev (Shinobu Hayashi)</managingEditor>
            <webMaster>me@shinyaigeek.dev (Shinobu Hayashi)</webMaster>
            <image>
                <url>https://storage.cloud.google.com/blog_assets_shinyaigeek/static/icon.png</url>
                <title>shinyaigeek.dev</title>
                <link>https://shinyaigeek.dev/</link>
                <width>32</width>
                <height>32</height>
            </image>
            ${items
              .map(
                (con: {
                  fields: { slug: string; title: string; description: string };
                }) => {
                  return `
                <item>
                <title>${con.fields.title} | shinyaigeek.dev</title>
                <link>https://shinyaigeek.dev/post/${con.fields.slug}</link>
                <description>${con.fields.description}</description>
                <guid>https://shinyaigeek.dev/post/${con.fields.slug}</guid>
                </item>
                    `;
                }
              )
              .join("")}
            </channel>
            </rss>
          `;

  return xml;
};
