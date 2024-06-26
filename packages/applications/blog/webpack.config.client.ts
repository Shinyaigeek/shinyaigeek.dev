import path from "node:path";
import { webpackBaseConfig } from "build-tool";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type webpack from "webpack";
import { merge } from "webpack-merge";

const config: webpack.Configuration = {
	target: "web",
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		filename: "[name].[contenthash].js",
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
	],
};

// biome-ignore lint: reason
export default merge(config, webpackBaseConfig as any);
