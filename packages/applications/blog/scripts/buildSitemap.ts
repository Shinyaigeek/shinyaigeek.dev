import { getSiteMap } from '../src/build/util/getSitemap.js';
import { writeContent } from '../src/contents-handler/contents-writer.js';

export const buildSitemap = async () => {
    const languages = ['en', 'ja'] as const;
    for (const language of languages) {
        const sitemap = await getSiteMap(language);

        writeContent(`./public/${language}/sitemap.xml`, sitemap);
    }
};

buildSitemap();
