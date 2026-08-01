import fs from "node:fs/promises";
import nodePath from "node:path";
import type { OutputHandler } from "ssg-router";
import { LABS_PUBLIC_DIRECTORY } from "../../../tools/build-utility";
import type { Context } from "../context";

/**
 * Writes a page as <route>/index.html. h2o serves the directory, so the route
 * has to be a directory with an index in it rather than a bare .html file --
 * that is what makes /projects/prerender2/ resolve without a redirect.
 */
export const outputPage: OutputHandler<Context> = async ({ path, content }) => {
	const directory = nodePath.join(LABS_PUBLIC_DIRECTORY, path);

	await fs.mkdir(directory, { recursive: true });
	await fs.writeFile(nodePath.join(directory, "index.html"), content);
};
