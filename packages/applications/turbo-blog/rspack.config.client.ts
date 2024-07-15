import type { Configuration } from "@rspack/cli";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

const config: Configuration = {
	target: "web",
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		filename: "[name].[contenthash].js",
		path: "public",
	},
};

// biome-ignore lint: reason
export default merge(config, rspackBaseConfig as any);
