import type { Configuration } from "@rspack/cli";
import Rspack from "@rspack/core";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

const CssExtractRspackPlugin = Rspack.CssExtractRspackPlugin;

const configForApplicationServer: Configuration = {
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		filename: "[name].[contenthash].js",
		path: "public/assets",
	},
	plugins: [
		new CssExtractRspackPlugin({
			filename: "style.[contenthash].css",
		}),
	],
	target: "web",
};

// biome-ignore lint: reason
export default merge(rspackBaseConfig, configForApplicationServer as any);
