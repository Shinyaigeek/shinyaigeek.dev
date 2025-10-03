import type { Configuration } from "@rspack/cli";
import Rspack from "@rspack/core";
import { buildSwcConfig } from "../javascript/swc/build-swc-config.ts";

const CssExtractRspackPlugin = Rspack.CssExtractRspackPlugin;

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
						loader: CssExtractRspackPlugin.loader,
						options: {
							publicPath: "./",
						},
					},
					{
						loader: "postcss-loader",
					},
				],
				type: "css/auto",
			},
		],
	},
	plugins: [
		new CssExtractRspackPlugin({
			filename: "style.css",
		}),
	],
};
