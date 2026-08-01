import { webpackBaseConfig } from "build-tool";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type webpack from "webpack";
import { merge } from "webpack-merge";
import { LABS_ASSETS_DIRECTORY } from "./tools/build-utility.ts";

/**
 * The client bundle as the dev loop builds it: the production config with the
 * content hashes taken out and development mode turned on.
 *
 * It is a separate file rather than an override of webpack.config.client.ts
 * because the stylesheet's name comes from a plugin option, and merging over a
 * config adds a second MiniCssExtractPlugin instead of reconfiguring the one
 * that is already there.
 */
const config: webpack.Configuration = merge(
	{
		entry: {
			client: "./src/client/index.ts",
		},
		mode: "development",
		devtool: "eval-cheap-module-source-map",
		output: {
			// Unhashed, so the name holds still across rebuilds. The built-assets
			// plugin finds the stylesheet by reading this directory, and the dev
			// server sends everything no-store, so nothing needs busting.
			filename: "[name].js",
			path: LABS_ASSETS_DIRECTORY,
		},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].css",
			}),
		],
	},
	webpackBaseConfig,
);

export default config;
