import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getContentAbsolutePath: (pathFromBlog: string) => string = function (pathFromBlog) {
    const blogRootPath = path.join(__dirname, '../../');
    return path.join(blogRootPath, pathFromBlog);
};
