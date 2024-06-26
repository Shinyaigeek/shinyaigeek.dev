import fs from "node:fs/promises";
import { getContentAbsolutePath } from "./get-content-path";

export const writeContent: (
	pathFromBlog: string,
	content: string,
) => Promise<void> = async (pathFromBlog, content) => {
	const targetFilePath = getContentAbsolutePath(pathFromBlog);
	fs.writeFile(targetFilePath, content);
};
