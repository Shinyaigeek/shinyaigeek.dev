import fs from "node:fs/promises";
import nodePath from "node:path";

export const outputIndexPage: ({
	path,
	content,
}: { path: string; content: string }) => Promise<void> = async ({
	content,
}) => {
	await fs.writeFile(nodePath.resolve("./public", "index.html"), content);
};
