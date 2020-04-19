import dotenv from "dotenv"
import fetch from "node-fetch"

dotenv.config()

export const getSiteMap = async () => {
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
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
        <loc>https://shinyaigeek.dev/</loc>
        <priority>1.0</priority>
        <lastmod>2019-08-13T00:20:52+09:00</lastmod>
        <changefreq>weekly</changefreq>
    </url>
    <url>
        <loc>https://shinyaigeek.dev/profile</loc>
        <priority>0.8</priority>
        <lastmod>2019-08-13T00:20:51+09:00</lastmod>
        <changefreq>weekly</changefreq>
    </url>
    ${items.map((con: { fields: { slug: string } }) => {
        return `
        <url>
        <loc>https://shinyaigeek.dev/post/${con.fields.slug}</loc>
    <priority>0.8 < /priority>
        <changefreq> weekly </changefreq>
        </url>
            `;
    }).join('')}
      
</urlset>
  `;

    return xml
}