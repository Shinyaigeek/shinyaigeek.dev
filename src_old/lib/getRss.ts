import dotenv from "dotenv"
import fetch from "node-fetch"

dotenv.config()

export const getRss = async () => {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
    if (!CONTENTFUL_ACCESS_TOKEN || !CONTENTFUL_SPACE_ID) {
        throw new Error("Please check env variable");
    }
    const url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=blog&order=-sys.createdAt&select=fields.description,fields.publishedAt,fields.title,fields.tags,fields.slug`;
    const json = await fetch(url).then(item => {
        return item.json()
    })

    const { items } = json

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version='2.0'  xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
    <atom:link href="https://shinyaigeek.dev/getRss" rel="self" type="application/rss+xml" />
    <title>しにゃいの学習帳</title>
    <link>https://shinyaigeek.dev/</link>
    <description>見習いWeb developer兼大学生のブログ. 主にweb開発の知見について喋ります</description>
    <language>ja</language>
    <copyright>(C) Shinyaigeek All Rights Reserved.</copyright>
    <managingEditor>me@shinyaigeek.dev (Shinobu Hayashi)</managingEditor>
    <webMaster>me@shinyaigeek.dev (Shinobu Hayashi)</webMaster>
    <image>
        <url>https://storage.cloud.google.com/blog_assets_shinyaigeek/static/icon.png</url>
        <title>しにゃいの学習帳</title>
        <link>https://shinyaigeek.dev/</link>
        <width>32</width>
        <height>32</height>
    </image>
    ${items.map((con: { fields: { slug: string, title: string, description: string } }) => {
        return `
        <item>
        <title>${con.fields.title} | しにゃいの学習帳</title>
        <link>https://shinyaigeek.dev/post/${con.fields.slug}</link>
        <description>${con.fields.description}</description>
        <guid>https://shinyaigeek.dev/post/${con.fields.slug}</guid>
        </item>
            `;
    }).join('')}
    </channel>
    </rss>
  `;

    return xml
}