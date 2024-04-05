import fs from "node:fs";
import path from "node:path";
import { getContentAbsolutePath } from "../src/contents-handler/get-content-path";

function copyFileSync(source: string, target: string) {
	let targetFile = target;

	// If target is a directory, a new file with the same name will be created
	if (fs.existsSync(target)) {
		if (fs.lstatSync(target).isDirectory()) {
			targetFile = path.join(target, path.basename(source));
		}
	}

	fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source: string, target: string) {
	let files = [];

	// Check if folder needs to be created or integrated
	const targetFolder = path.join(target, path.basename(source));
	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder);
	}

	// Copy
	if (fs.lstatSync(source).isDirectory()) {
		files = fs.readdirSync(source);
		files.forEach((file) => {
			const curSource = path.join(source, file);
			if (fs.lstatSync(curSource).isDirectory()) {
				copyFolderRecursiveSync(curSource, targetFolder);
			} else {
				copyFileSync(curSource, targetFolder);
			}
		});
	}
}

copyFolderRecursiveSync(
	getContentAbsolutePath("./src/assets"),
	getContentAbsolutePath("./public"),
);
