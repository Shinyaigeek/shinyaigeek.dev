import { writeFileSync } from 'fs';
import { getSiteMap } from '../src/build/util/getSitemap.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const buildSitemap = async () => {
    const languages = ['en', 'ja'] as const;
    for (const language of languages) {
        const sitemap = await getSiteMap(language);

        writeFileSync(path.join(__dirname, `../public/${language}/sitemap.xml`), sitemap);
    }
};

buildSitemap();
