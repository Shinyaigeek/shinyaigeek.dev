import dotenv from 'dotenv';
import { getBlogPosts } from './getBlogPosts.js';
import { getContentAbsolutePath } from '../../contents-handler/get-content-path.js';
dotenv.config();

export const getRss = (language: 'en' | 'ja') => {
    const items = getBlogPosts(
        getContentAbsolutePath('./src/articles/public/') as `${string}/`,
        language
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
            <rss version='2.0'  xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
            <atom:link href="https://shinyaigeek.dev/rss.xml" rel="self" type="application/rss+xml" />
            <title>shinyaigeek.dev</title>
            <link>https://shinyaigeek.dev/</link>
            <description>Web が好きなオタクのブログ. 主にweb開発の知見について喋ります</description>
            <language>ja</language>
            <copyright>(C) Shinyaigeek All Rights Reserved.</copyright>
            <managingEditor>me@shinyaigeek.dev (Shinobu Hayashi)</managingEditor>
            <webMaster>me@shinyaigeek.dev (Shinobu Hayashi)</webMaster>
            <image>
                <url>https://shinyaigeek.dev/assets/static/icon.png</url>
                <title>shinyaigeek.dev</title>
                <link>https://shinyaigeek.dev/</link>
                <width>32</width>
                <height>32</height>
            </image>
            ${items
                .map((con: { fields: { slug: string; title: string; description: string } }) => {
                    return `
                <item>
                <title>${con.fields.title} | shinyaigeek.dev</title>
                <link>https://shinyaigeek.dev/post/${con.fields.slug}</link>
                <description>${con.fields.description}</description>
                <guid>https://shinyaigeek.dev/post/${con.fields.slug}</guid>
                </item>
                    `;
                })
                .join('')}
            </channel>
            </rss>
          `;

    return xml;
};
