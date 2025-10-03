import type { Configuration } from "@rspack/cli";
import Rspack from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";
import { buildSwcConfig } from "build-tool/javascript/swc/build-swc-config.ts";
import { merge } from "webpack-merge";

const devBaseConfig: Configuration = {
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
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[name]__[local]___[hash:base64:5]",
							},
						},
					},
					"postcss-loader",
				],
				type: "css",
			},
		],
	},
};

const configForDevelopment: Configuration = {
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		filename: "[name].js",
		path: "public/assets",
		clean: true,
	},
	mode: "development",
	devtool: "eval-cheap-module-source-map",
	devServer: {
		port: 3000,
		hot: true,
		historyApiFallback: true,
		static: [
			{
				directory: "public",
				publicPath: "/",
			},
		],
		devMiddleware: {
			writeToDisk: true,
		},
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	},
	plugins: [new ReactRefreshPlugin()],
	target: "web",
};

// biome-ignore lint: reason
export default merge(devBaseConfig, configForDevelopment as any);
