import fs from "node:fs/promises";
import nodePath from "node:path";
import type { GenerateOutput } from "ssg-router";
import type { Context } from "../context/context";
import { Language } from "../model/language/language.entity";

/** public/ja and public/en are served as the two language hosts. */
export const languageDirectory = (language: Language) =>
	language === Language.ja ? "ja" : "en";

/**
 * Turns a route path into the path within a language's directory.
 *
 * English routes are registered as "/en/post/" so they get their own entries,
 * but the language already chooses the output directory, so the prefix has to
 * come off -- otherwise the English blog index lands in public/en/en/post/ and
 * en.shinyaigeek.dev/post/ is a 404, which is exactly what used to happen.
 *
 * Anchored on purpose: a plain replace("/en", "") would also eat the "/en" in a
 * slug like "/post/enumerable/".
 */
export const sitePath = (path: string) =>
	path.replace(/^\/en(?=\/|$)/, "") || "/";

/** Writes a page as <dir>/index.html, the layout the static host expects. */
export const writePage = async (
	path: string,
	content: GenerateOutput,
	context: Context,
) => {
	const directory = `./public/${languageDirectory(context.language)}${sitePath(path)}`;
	await fs.mkdir(directory, { recursive: true });
	await fs.writeFile(nodePath.resolve(directory, "index.html"), content);
};

/** Writes a single file (rss.xml, sitemap.xml, ogp.png) at the route's path. */
export const writeFile = async (
	path: string,
	content: GenerateOutput,
	context: Context,
) => {
	const filePath = `./public/${languageDirectory(context.language)}${sitePath(path)}`;
	await fs.mkdir(nodePath.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, content);
};
