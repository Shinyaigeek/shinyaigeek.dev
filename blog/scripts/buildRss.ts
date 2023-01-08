import { writeFileSync } from "fs";
import { getRss } from "../src/build/util/getRss";
import path from "path";
import fs from "fs/promises";

export const buildRss = async () => {
  const languages = ["en", "ja"] as const;
  for (const language of languages) {
    const rss = await getRss(language);

    await fs.mkdir(path.join(__dirname, `../../public/${language}`), {
      recursive: true,
    });

    writeFileSync(
      path.join(__dirname, `../../public/${language}/rss.xml`),
      rss
    );
  }
};

buildRss();
