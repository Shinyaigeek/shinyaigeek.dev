import type { Configuration } from "@rspack/cli";
import { rspackBaseConfig } from "build-tool";
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
	target: "node",
};

// biome-ignore lint: reason
export default merge(rspackBaseConfig, configForApplicationServer as any);
