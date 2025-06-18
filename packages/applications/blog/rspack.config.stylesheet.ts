import type { Configuration } from "@rspack/cli";
import Rspack from "@rspack/core";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

const CssExtractRspackPlugin = Rspack.CssExtractRspackPlugin;

const configForApplicationServer: Configuration = {
	entry: {
		style: "./src/stylesheet.ts",
	},
	output: {
		path: "public/assets",
	},
	plugins: [
		new CssExtractRspackPlugin({
			filename: "style.css",
		}),
	],
	mode: "development",
	target: "web",
};

// biome-ignore lint: reason
export default merge(rspackBaseConfig, configForApplicationServer as any);
