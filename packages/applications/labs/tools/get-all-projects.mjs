import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const getAllProjects = () =>
	fs
		.readdirSync(path.join(__dirname, "../src/pages/projects"))
		.map((projectFileName) => path.parse(projectFileName).name);
