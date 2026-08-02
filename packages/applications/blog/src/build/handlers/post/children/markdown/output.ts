import type { OutputHandler } from "ssg-router";
import type { Context } from "../../../../context/context";
import { writeFile } from "../../../write-output";

export const outputBlogPostMarkdown: OutputHandler<Context> = async ({
	path,
	content,
	context,
}) => {
	// writeFile rather than writePage: the route already names the file, and it
	// lands next to the index.html the page handler writes into the same
	// directory.
	await writeFile(path, content, context);
};
