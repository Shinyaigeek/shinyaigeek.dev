import fs from 'fs/promises';
import { getContentAbsolutePath } from './get-content-path.js';

export const writeContent: (pathFromBlog: string, content: string) => Promise<void> =
    async function (pathFromBlog, content) {
        const targetFilePath = getContentAbsolutePath(pathFromBlog);
        fs.writeFile(targetFilePath, content);
    };
