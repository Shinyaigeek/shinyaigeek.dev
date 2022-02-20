import { writeFileSync } from "fs";
import { getRss } from "../src/build/util/getRss";
import path from "path";

export const buildRss = async () => {
  const languages = ["en", "ja"] as const;
  for (const language of languages) {
    const rss = await getRss(language);

    writeFileSync(
      path.join(__dirname, `../../public/${language}/rss.xml`),
      rss
    );
  }
};

buildRss();
