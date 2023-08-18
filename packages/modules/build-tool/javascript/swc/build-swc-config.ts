import { Config } from '@swc/core';

export const buildSwcConfig: () => Config = function () {
    return {
        jsc: {
            parser: {
                syntax: 'typescript',
                tsx: true,
            },
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
            experimental: {
                plugins: [['@lingui/swc-plugin', {}]],
            },
        },
        module: {
            type: 'nodenext',
        },
    };
};
