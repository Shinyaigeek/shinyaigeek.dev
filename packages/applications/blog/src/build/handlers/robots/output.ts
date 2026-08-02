import type { OutputHandler } from "ssg-router";
import type { Context } from "../../context/context";
import { writeFile } from "../write-output";

export const outputRobotsTxt: OutputHandler<Context> = async ({
	path,
	content,
	context,
}) => {
	await writeFile(path, content, context);
};
