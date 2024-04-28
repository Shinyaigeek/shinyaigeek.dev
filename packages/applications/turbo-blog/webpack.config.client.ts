import { webpackBaseConfig } from "build-tool";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";

const config: Configuration = {
	target: "web",
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		filename: "[name].js",
	},
};

// biome-ignore lint: reason
export default merge(config, webpackBaseConfig as any);
