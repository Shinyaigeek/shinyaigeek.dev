import fs from "node:fs/promises";
import type { OutputHandler } from "ssg-router";
import type { Context } from "../../../context/context";
import { Language } from "../../../model/language/language.entity";

export const outputBlogPostPage: OutputHandler<Context> = async ({
	path,
	content,
	context,
}) => {
	const directoryPath = `./public/${
		context.language === Language.ja ? "ja" : "en"
	}${path.replace("/en", "")}`;
	await fs.mkdir(directoryPath, { recursive: true });
	await fs.writeFile(`${directoryPath}/index.html`, content);
};
