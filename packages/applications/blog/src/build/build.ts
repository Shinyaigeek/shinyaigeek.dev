import path from 'path';
import { handleIndex } from './handlers/index/index';
import { getChildren } from './handlers/post/getChildren/getChildren';
import { handleProfile } from './handlers/profile/handleProfile';
import { Router } from './router/router';
import { writeFileWithDir } from './util/writeFileWithDir';
import { minify } from 'html-minifier';
import { addDOCTYP } from './util/addDOCTYPE';
import { i18n } from '@lingui/core';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { messages as ja } from '../locales/ja/messages';
import { messages as en } from '../locales/en/messages';

export const build = () => {
    const router = new Router();

    const postChildren = getChildren();

    router.registerDefaultLanguage('ja', ja);
    router.registerLanguage('en', en);

    // todo interface
    router.on('/post', undefined, [postChildren]);
    router.on('/', handleIndex, undefined);
    router.on('/profile', handleProfile, undefined);
    router.out(function (slug, html) {
        writeFileWithDir(
            path.join(__dirname, `./public${slug}/index.html`),
            minify(addDOCTYP(html))
        );
    });
};
