import fs from "node:fs/promises";
import nodePath from "node:path";
import type { OutputHandler } from "ssg-router";
import type { Context } from "../../context/context";
import { Language } from "../../model/language/language.entity";

export const outputOGImagePage: OutputHandler<Context> = async ({
	path,
	content,
	context,
}) => {
	const languageDir = context.language === Language.ja ? "ja" : "en";
	const filePath = `./public/${languageDir}${path.replace("/en", "")}`;

	await fs.mkdir(nodePath.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, content as Buffer);
};
