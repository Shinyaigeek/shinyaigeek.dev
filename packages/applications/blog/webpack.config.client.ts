import path from "path";
import webpack from 'webpack';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { webpackBaseConfig } from 'build-tool';
import { merge } from 'webpack-merge';

const config: webpack.Configuration = {
    target: 'web',
    entry: {
        client: './src/client/main.tsx',
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader],
            },
        ],
    },
};

export default merge(config, webpackBaseConfig);
