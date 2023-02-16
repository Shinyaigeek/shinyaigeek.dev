import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { webpackBaseConfig } from 'build-tool/webpack/webpack.config.base';

import { config } from 'dotenv';
config();

const configForApplicationServer: webpack.Configuration = {
    entry: {
        main: './src/build/build.ts',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true,
                                exportOnlyLocals: true,
                            },
                        },
                    },
                    'sass-loader',
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

export default merge(webpackBaseConfig, configForApplicationServer);
