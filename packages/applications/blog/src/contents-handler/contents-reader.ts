import fs from 'fs/promises';
import { getContentAbsolutePath } from './get-content-path.js';

export const readContent: (pathFromBlog: string) => Promise<string> = async function (
    pathFromBlog
) {
    const targetFilePath = getContentAbsolutePath(pathFromBlog);
    return fs.readFile(targetFilePath, {
        encoding: 'utf-8',
    });
};

export const readContentsDirectory: (pathFromBlog: string) => Promise<string[]> = async function(
    pathFromBlog
) {
    const targetDirectoryPath = getContentAbsolutePath(pathFromBlog);
    return fs.readdir(targetDirectoryPath)
}
