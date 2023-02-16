import webpack from 'webpack';
import { LABS_OUTPUT_DIRECTORY } from './tools/build-utility';

export const webpackBaseConfig: webpack.Configuration = {
    output: {
        path: LABS_OUTPUT_DIRECTORY,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'swc-loader',
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
        ],
    },
};
