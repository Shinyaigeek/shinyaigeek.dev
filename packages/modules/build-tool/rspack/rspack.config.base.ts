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
				// Rspack's native CSS support handles extraction and CSS modules on
				// its own, so this rule needs no loaders: CssExtractRspackPlugin
				// no-ops (and warns) against a `css` module type, and postcss-loader
				// only ever parsed and reprinted the CSS unchanged, there being no
				// postcss config in the repo.
				type: "css/auto",
			},
		],
	},
};
