import type { Configuration } from "@rspack/cli";
import { buildSwcConfig } from "../javascript/swc/build-swc-config.ts";

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
				// Rspack's native CSS support handles extraction and CSS modules,
				// so CssExtractRspackPlugin is not involved (it warns and no-ops
				// when combined with a `css` module type).
				type: "css/auto",
			},
		],
	},
};
