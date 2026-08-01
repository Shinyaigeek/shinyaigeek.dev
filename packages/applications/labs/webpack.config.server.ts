import { webpackBaseConfig } from "build-tool";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type webpack from "webpack";
import { merge } from "webpack-merge";
import { LABS_DIST_DIRECTORY } from "./tools/build-utility.ts";

const config: webpack.Configuration = merge(
	{
		entry: {
			build: "./src/build/build.ts",
		},
		// `pnpm build` is a production build; webpack warns when mode is unset.
		mode: "production",
		output: {
			filename: "[name].js",
			path: LABS_DIST_DIRECTORY,
			// The package is type: module, so `node ./dist/build.js` reads the
			// bundle as ESM and a default CommonJS bundle would die on `module`.
			chunkFormat: "module",
			library: {
				type: "module",
			},
		},
		experiments: {
			outputModule: true,
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
			// The page components import their stylesheets, so something has to
			// handle the CSS even though this build only needs the class name map
			// out of it. The extracted file lands in dist/, which is not deployed.
			new MiniCssExtractPlugin({
				filename: "ignored.css",
			}),
		],
	},
	webpackBaseConfig,
);

export default config;
