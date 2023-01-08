import { writeFileSync } from "fs";
import { getSiteMap } from "../src/build/util/getSitemap";
import path from "path";

export const buildSitemap = async () => {
  const languages = ["en", "ja"] as const;
  for (const language of languages) {
    const sitemap = await getSiteMap(language);

    writeFileSync(path.join(__dirname, `../public/${language}/sitemap.xml`), sitemap);
  }
};

buildSitemap();
