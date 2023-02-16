const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

const isProd = process.env.NODE_ENV !== 'development';
const output = process.env.STATIC_FILE_OUTPUT || 'server';

module.exports = {
    entry: {
        main: './src/build/build.ts',
    },
    output: {
        path: path.join(__dirname, output),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    },
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: 'tsconfig.json',
                        },
                    },
                ],
            },
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
            CONTENTFUL_SPACE_ID: JSON.stringify(process.env.CONTENTFUL_SPACE_ID),
            CONTENTFUL_ACCESS_TOKEN: JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};
