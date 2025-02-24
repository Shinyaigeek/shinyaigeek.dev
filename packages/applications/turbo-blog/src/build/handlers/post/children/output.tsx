import fs from "node:fs/promises";
import type { OutputHandler } from "ssg-router";
import type { Context } from "../../../context/context";

export const outputBlogPostPage: OutputHandler<Context> = async ({
	path,
	content,
}) => {
	const directoryPath = `./public/${path}`;
	await fs.mkdir(directoryPath, { recursive: true });
	await fs.writeFile(`${directoryPath}/index.html`, content);
};
