import fs from "node:fs/promises";
import nodePath from "node:path";
import type { GenerateOutput } from "ssg-router";
import type { Context } from "../context/context";
import { sitePath } from "./site-path";

/**
 * public/ja and public/en are served as the two language hosts, so the language
 * code doubles as the output directory.
 */
const outputPath = (path: string, language: string) =>
	`./public/${language}${sitePath(path)}`;

/** Writes a page as <dir>/index.html, the layout the static host expects. */
export const writePage = async (
	path: string,
	content: GenerateOutput,
	context: Context,
) => {
	const directory = outputPath(path, context.language);
	await fs.mkdir(directory, { recursive: true });
	await fs.writeFile(nodePath.resolve(directory, "index.html"), content);
};

/** Writes a single file (rss.xml, sitemap.xml, ogp.png) at the route's path. */
export const writeFile = async (
	path: string,
	content: GenerateOutput,
	context: Context,
) => {
	const filePath = outputPath(path, context.language);
	await fs.mkdir(nodePath.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, content);
};
