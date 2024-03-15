import { rspackBaseConfig } from 'build-tool';
import { merge } from 'webpack-merge';
import { Configuration } from '@rspack/core';

const config: Configuration = {
    target: 'web',
    entry: {
        client: './src/client/main.tsx',
    },
    output: {
        filename: '[name].[contenthash].js',
    },
};

export default merge(config, rspackBaseConfig as any);
