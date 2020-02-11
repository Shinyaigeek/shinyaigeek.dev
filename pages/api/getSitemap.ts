export default async (req:any, res:any) => {
  const itemNum = require.context("../../items", true, /\.md$/).keys().length;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
        <loc>https://www.shinyaigeek.com/</loc>
        <priority>1.0</priority>
        <lastmod>2019-08-13T00:20:52+09:00</lastmod>
        <changefreq>weekly</changefreq>
    </url>
    <url>
        <loc>https://www.shinyaigeek.com/profile</loc>
        <priority>0.8</priority>
        <lastmod>2019-08-13T00:20:51+09:00</lastmod>
        <changefreq>weekly</changefreq>
    </url>
    ${Array(itemNum)
      .fill(1)
      .map((con, index) => {
        return `
            <url>
                <loc>https://www.shinyaigeek.com/post/${index + 1}</loc>
                <priority>0.8</priority>
                <changefreq>weekly</changefreq>
            </url>
            `;
      }).join('')}
      
</urlset>
  `;
    
  res.end(xml)
};
