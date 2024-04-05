import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const LABS_OUTPUT_DIRECTORY = path.join(__dirname, "../dist");

export const getBuiltAssetFilename = () => {
	const builtAssets = fs.readdirSync(LABS_OUTPUT_DIRECTORY);

	const css = builtAssets.find(
		(asset) => asset.startsWith("client") && asset.endsWith(".css"),
	);

	if (!css) {
		throw new Error("cannot find css output in dist directory");
	}

	return {
		css,
	};
};
