import type { OutputHandler } from "ssg-router";
import type { Context } from "../../context/context";
import { writePage } from "../write-output";

export const outputBlogIndexPage: OutputHandler<Context> = async ({
	path,
	content,
	context,
}) => {
	await writePage(path, content, context);
};
