import { mkdirSync, writeFileSync } from "node:fs";

export const writeFileWithDir: (path: string, data: string) => void = (
	path,
	data,
) => {
	const dir = path
		.split("/")
		.filter((p) => !p.includes(".html"))
		.join("/");
	mkdirSync(dir, { recursive: true });
	writeFileSync(path, data);
};
