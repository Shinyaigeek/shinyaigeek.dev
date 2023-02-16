import webpack from 'webpack';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { webpackBaseConfig } from 'build-tool/webpack/webpack.config.base';

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
