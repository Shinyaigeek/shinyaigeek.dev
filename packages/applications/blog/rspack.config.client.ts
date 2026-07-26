import type { Configuration } from "@rspack/cli";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

const configForApplicationClient: Configuration = {
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		filename: "[name].[contenthash].js",
		path: "public/assets",
	},
	target: "web",
};

export default merge(rspackBaseConfig, configForApplicationClient);
