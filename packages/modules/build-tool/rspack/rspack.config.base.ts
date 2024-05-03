import type { Configuration } from "@rspack/cli";
import { buildSwcConfig } from "../javascript/swc/build-swc-config.js";

export const rspackBaseConfig: Configuration = {
	resolve: {
		extensions: [
			".ts",
			".tsx",
			".mts",
			".cts",
			".js",
			".jsx",
			".cjs",
			".mjs",
			".json",
			".css",
		],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "builtin:swc-loader",
				options: buildSwcConfig(),
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "postcss-loader",
					},
				],
				type: "css/auto",
			},
		],
	},
};
