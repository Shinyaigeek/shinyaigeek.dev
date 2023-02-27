import webpack from 'webpack';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { webpackBaseConfig } from 'build-tool';
import { merge } from 'webpack-merge';

const config: webpack.Configuration = {
    target: 'web',
    entry: {
        main: './src/front/main.tsx',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader],
            },
        ],
    },
};

export default merge(config, webpackBaseConfig);
