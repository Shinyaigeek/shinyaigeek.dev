import type webpack from "webpack";
import { buildSwcConfig } from "../javascript/swc/build-swc-config.ts";

export const webpackBaseConfig: webpack.Configuration = {
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
				loader: "swc-loader",
				options: buildSwcConfig(),
			},
			{
				test: /\.css$/i,
				use: ["css-loader", "sass-loader"],
			},
		],
	},
};
