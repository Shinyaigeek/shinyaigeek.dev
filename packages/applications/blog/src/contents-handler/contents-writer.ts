import fs from 'fs/promises';
import { getContentAbsolutePath } from './get-content-path';

export const writeContent: (pathFromBlog: string, content: string) => Promise<void> =
    async function (pathFromBlog, content) {
        const targetFilePath = getContentAbsolutePath(pathFromBlog);
        fs.writeFile(targetFilePath, content);
    };
