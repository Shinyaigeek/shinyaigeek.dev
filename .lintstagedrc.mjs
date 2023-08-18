import path from 'path';
import { ESLint } from 'eslint';

const buildEslintCommand = async (filenames) => {
    const filteredFiles = await removeIgnoredFiles(filenames);

    if (filteredFiles.length < 1) {
        return '';
    }
    return `eslint --fix ${filteredFiles.map((f) => path.relative(process.cwd(), f)).join(' ')}`;
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
            await buildEslintCommand(files),
            `prettier --write ${files.map((file) => `"${file}"`).join(' ')}`,
        ].filter((command) => command.length > 0);
    },
    '*.{html,md,yaml,yml,json,css,scss,less,sass,graphql,mdx}': ['prettier --write'],
};

export default config;
