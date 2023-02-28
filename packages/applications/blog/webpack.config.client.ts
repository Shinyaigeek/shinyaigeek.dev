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
        filename: '[name].[contenthash].js',
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
            filename: '[name].[contenthash].css',
        }),
    ],
};

export default merge(config, webpackBaseConfig);
