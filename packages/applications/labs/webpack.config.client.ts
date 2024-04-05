import { webpackBaseConfig } from "build-tool";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type webpack from "webpack";
import { merge } from "webpack-merge";

const config: webpack.Configuration = merge(
	{
		entry: {
			client: "./src/client/index.ts",
		},
		output: {
			filename: "[name].[contenthash].js",
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
