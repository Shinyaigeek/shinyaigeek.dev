import path from 'path';
import { ESLint } from 'eslint';

const buildLinterCommand = async (filenames) => {
    const filteredFiles = await removeIgnoredFiles(filenames);

    if (filteredFiles.length < 1) {
        return '';
    }
    return `biome check --apply-unsafe ${filteredFiles.map((f) => path.relative(process.cwd(), f)).join(' ')}`;
};

const removeIgnoredFiles = async (files) => {
    const eslint = new ESLint();
    const isIgnored = await Promise.all(
        files.map((file) => {
            return eslint.isPathIgnored(file);
        })
    );
    const filteredFiles = files.filter((_, i) => !isIgnored[i]);
    return filteredFiles;
};

const config = {
    '*.{js,jsx,mjs,ts,tsx}': async (files) => {
        return [
            await buildLinterCommand(files),
            `biome format --write ${files.map((file) => `"${file}"`).join(' ')}`,
        ].filter((command) => command.length > 0);
    },
    '*.{html,md,yaml,yml,json,css,scss,less,sass,graphql,mdx}': ['biome format --write'],
};

export default config;
