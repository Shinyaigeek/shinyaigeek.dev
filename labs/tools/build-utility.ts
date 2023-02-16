import path from 'path';
import fs from 'fs';

export const LABS_OUTPUT_DIRECTORY = path.join(__dirname, '../dist');

export const getBuiltAssetFilename = function () {
    const builtAssets = fs.readdirSync(LABS_OUTPUT_DIRECTORY);

    const css = builtAssets.find((asset) => asset.startsWith('client') && asset.endsWith('.css'));

    if (!css) {
        throw new Error('cannot find css output in dist directory');
    }

    return {
        css,
    };
};
