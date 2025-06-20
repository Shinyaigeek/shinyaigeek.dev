import fs from "node:fs/promises";
import nodePath from "node:path";
import type { OutputHandler } from "ssg-router";
import type { Context } from "../../context/context";
import { Language } from "../../model/language/language.entity";

export const outputFleetsPage: OutputHandler<Context> = async ({
	path,
	content,
	context,
}) => {
	const directoryPath = `./public/${
		context.language === Language.ja ? "ja" : "en"
	}${path}`;
	await fs.mkdir(directoryPath, { recursive: true });
	await fs.writeFile(nodePath.resolve(directoryPath, "index.html"), content);
};
