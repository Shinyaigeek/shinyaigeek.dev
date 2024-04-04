import fs from "fs";
import { readContentsDirectory } from "../src/contents-handler/contents-reader";

export const getBuiltAssetFilename = async function () {
	const builtAssets = await readContentsDirectory("./public");

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
