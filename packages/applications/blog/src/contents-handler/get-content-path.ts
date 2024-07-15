import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getContentAbsolutePath: (pathFromBlog: string) => string = (
	pathFromBlog,
) => {
	const blogRootPath = path.join(__dirname, "../../");
	return path.join(blogRootPath, pathFromBlog);
};
