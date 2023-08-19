import { getRss } from '../src/build/util/getRss.js';
import { writeContent } from '../src/contents-handler/contents-writer.js';

export const buildRss = async () => {
    const languages = ['en', 'ja'] as const;
    for (const language of languages) {
        const rss = await getRss(language);

        await writeContent(`./public/${language}/rss.xml`, rss);
    }
};

buildRss();
