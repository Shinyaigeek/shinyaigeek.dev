import type { Configuration } from "@rspack/core";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

const config: Configuration = {
	target: "web",
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		filename: "[name].[contenthash].js",
	},
};

export default merge(config, rspackBaseConfig as any);
