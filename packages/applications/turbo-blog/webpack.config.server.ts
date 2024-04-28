import { webpackBaseConfig } from "build-tool";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";

const configForApplicationServer: Configuration = {
	entry: {
		main: "./src/jsx-renderer-server/main.tsx",
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
	resolve: {
		conditionNames: ["react-server", "node", "webpack", "import"],
	},
};

// biome-ignore lint: reason
export default merge(webpackBaseConfig, configForApplicationServer as any);
