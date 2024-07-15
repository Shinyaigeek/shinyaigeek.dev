import { webpackBaseConfig } from "build-tool";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";

const configForApplicationServer: Configuration = {
	entry: {
		build: "./src/build/build.ts",
	},
	output: {
		filename: "[name].js",
		chunkFormat: "module",
		library: {
			type: "module",
		},
	},
	experiments: {
		outputModule: true,
	},
	mode: "production",
	target: "node",

	optimization: {
		minimize: false,
	},
};

// biome-ignore lint: reason
export default merge(webpackBaseConfig, configForApplicationServer as any);
