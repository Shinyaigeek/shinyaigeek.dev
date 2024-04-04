import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const getAllProjects = function () {
	return fs
		.readdirSync(path.join(__dirname, "../src/pages/projects"))
		.map((projectFileName) => path.parse(projectFileName).name);
};
