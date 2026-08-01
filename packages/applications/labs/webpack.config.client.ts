import { webpackBaseConfig } from "build-tool";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type webpack from "webpack";
import { merge } from "webpack-merge";
import { LABS_ASSETS_DIRECTORY } from "./tools/build-utility.ts";

const config: webpack.Configuration = merge(
	{
		entry: {
			client: "./src/client/index.ts",
		},
		// `pnpm build` is a production build; webpack warns when mode is unset.
		mode: "production",
		output: {
			filename: "[name].[contenthash].js",
			// Straight into the deployed tree, so the SSG can write the HTML that
			// links to it around it rather than a later copy step having to.
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
				filename: "[name].[contenthash].css",
			}),
		],
	},
	webpackBaseConfig,
);

export default config;
