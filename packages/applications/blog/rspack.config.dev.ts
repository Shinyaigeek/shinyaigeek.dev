import type { Configuration } from "@rspack/cli";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

// Reuses the shared base config so CSS modules resolve to the same class names
// in dev as in production. It used to redeclare the CSS rule with
// style-loader + css-loader *and* `type: "css"`, which mixes the JS-based CSS
// pipeline with Rspack's native one.
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
	plugins: [new ReactRefreshRspackPlugin()],
	target: "web",
};

export default merge(rspackBaseConfig, configForDevelopment);
