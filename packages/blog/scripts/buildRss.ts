import { writeFileSync } from "fs";
import { getRss } from "../src/build/util/getRss";
import path from "path";

export const buildRss = async () => {
  const rss = await getRss();

  writeFileSync(path.join(__dirname, "../public/rss.xml"), rss);
};

buildRss();