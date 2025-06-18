import type { Plugin } from "ssg-router";
import type { Context } from "../context/context";
import { NodeFileIOInfrastructure } from "../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../infrastructure/file-path/node-file-path";

export const registerBuiltAssetsPlugin: Plugin<Context> = {
	async onRouted(_, context) {
		const fileIOInfrastructure = new NodeFileIOInfrastructure();
		const filePathInfrastructure = new NodeFilePathImplementation();
		const publicPath = filePathInfrastructure.resolve(
			process.cwd(),
			"public/assets",
		);
		const builtAssets = await fileIOInfrastructure.readDirectory(publicPath);

		const javascriptFileNames = builtAssets.filter((asset) =>
			asset.endsWith(".js"),
		);

		const cssFileNames = builtAssets.filter((asset) => asset.endsWith(".css"));

		if (javascriptFileNames.length !== 1) {
			throw new Error(
				`Expected 1 javascript file, got ${javascriptFileNames.length}`,
			);
		}

		if (cssFileNames.length !== 1) {
			throw new Error(`Expected 1 css file, got ${cssFileNames.length}`);
		}

		context.builtAssets = {
			javascript: javascriptFileNames[0],
			css: cssFileNames[0],
		};
	},
};
