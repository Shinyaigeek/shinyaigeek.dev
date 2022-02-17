import dotenv from "dotenv";
import { getBlogPosts } from "./getBlogPosts";
import path from "path";

dotenv.config();

function formatDate(date: Date) {
  var y = date.getFullYear();
  var m = ('00' + (date.getMonth()+1)).slice(-2);
  var d = ('00' + date.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

export const getSiteMap = () => {
  
  const items = getBlogPosts(
    path.join(__dirname, "../../articles/public/") as `${string}/`
  );
  const date = new Date();
  const lastmod = formatDate(date);

  // TODO lastmod

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <url>
                <loc>https://shinyaigeek.dev/</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://shinyaigeek.dev/en/</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://shinyaigeek.dev/profile/</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https://shinyaigeek.dev/en/profile/</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>
            ${items
              .map((con: { fields: { slug: string } }) => {
                return `<url>
    <loc>https://shinyaigeek.dev/post/${con.fields.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
<url>
    <loc>https://shinyaigeek.dev/en/post/${con.fields.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>`;
              })
              .join("")}
              
        </urlset>
          `;

  return xml;
};
