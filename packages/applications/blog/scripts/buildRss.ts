import { writeFileSync } from 'fs';
import { getRss } from '../src/build/util/getRss.js';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const buildRss = async () => {
    const languages = ['en', 'ja'] as const;
    for (const language of languages) {
        const rss = await getRss(language);

        await fs.mkdir(path.join(__dirname, `../public/${language}`), {
            recursive: true,
        });

        writeFileSync(path.join(__dirname, `../public/${language}/rss.xml`), rss);
    }
};

buildRss();
