import fs from "node:fs/promises";
import type { Plugin } from "ssg-router";
import { LABS_ASSETS_DIRECTORY } from "../../../tools/build-utility";
import type { Context } from "../context";

/**
 * The client bundle is content hashed, so the stylesheet's name is only known
 * once `build:client` has run. Reading it here rather than baking it into the
 * server bundle keeps the two builds independent: the server build no longer
 * has to be configured from the client build's output directory.
 */
export const registerBuiltAssetsPlugin: Plugin<Context> = {
	async onRouted(_, context) {
		const builtAssets = await fs.readdir(LABS_ASSETS_DIRECTORY);
		const cssFileNames = builtAssets.filter((asset) => asset.endsWith(".css"));

		if (cssFileNames.length !== 1) {
			throw new Error(
				`Expected 1 css file in ${LABS_ASSETS_DIRECTORY}, got ${cssFileNames.length}`,
			);
		}

		context.builtAssets = {
			css: cssFileNames[0],
		};
	},
};
