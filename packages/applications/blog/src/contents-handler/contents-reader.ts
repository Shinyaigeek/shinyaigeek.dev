import fs from "node:fs/promises";
import { getContentAbsolutePath } from "./get-content-path";

export const readContent: (pathFromBlog: string) => Promise<string> = async (
	pathFromBlog,
) => {
	const targetFilePath = getContentAbsolutePath(pathFromBlog);
	return fs.readFile(targetFilePath, {
		encoding: "utf-8",
	});
};

export const readContentsDirectory: (
	pathFromBlog: string,
) => Promise<string[]> = async (pathFromBlog) => {
	const targetDirectoryPath = getContentAbsolutePath(pathFromBlog);
	return fs.readdir(targetDirectoryPath);
};
