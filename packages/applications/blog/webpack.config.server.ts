import path from "node:path";
import { webpackBaseConfig } from "build-tool";
import webpack from "webpack";
import { merge } from "webpack-merge";

import { config } from "dotenv";
config();

const configForApplicationServer: webpack.Configuration = {
	entry: {
		main: "./src/build/build.ts",
	},
	output: {
		filename: "[name].js",
		environment: {
			module: true,
			dynamicImport: true,
		},
		chunkFormat: "module",
		library: {
			type: "module",
		},
	},
	experiments: {
		outputModule: true,
	},
	mode: "development",
	target: "node",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: "css-loader",
						options: {
							modules: {
								auto: true,
								exportOnlyLocals: true,
							},
						},
					},
					"sass-loader",
				],
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		}),
	],
};

// biome-ignore lint: reason
export default merge(webpackBaseConfig, configForApplicationServer as any);
