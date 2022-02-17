import { writeFileSync } from "fs";
import { getSiteMap } from "../src/build/util/getSitemap";
import path from "path";

export const buildSitemap = async () => {
  const rss = await getSiteMap();

  writeFileSync(path.join(__dirname, "../../public/sitemap.xml"), rss);
};

buildSitemap();
