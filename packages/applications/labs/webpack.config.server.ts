import { webpackBaseConfig } from "build-tool";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { merge } from "webpack-merge";
import { getBuiltAssetFilename } from "./tools/build-utility.js";

const builtAssetsFilename = getBuiltAssetFilename();

const config: webpack.Configuration = merge(
	{
		entry: {
			server: "./src/server/index.tsx",
		},
		output: {
			filename: "[name].js",
		},
		target: "node",
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
				filename: "ignored.css",
			}),
			new webpack.DefinePlugin({
				$CSS_BUILT_ASSET_FILENAME: JSON.stringify(builtAssetsFilename.css),
			}),
		],
	},
	webpackBaseConfig,
);

export default config;
