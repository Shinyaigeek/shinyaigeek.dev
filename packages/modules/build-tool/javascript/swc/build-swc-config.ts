import { Config } from '@swc/core';

export const buildSwcConfig: () => Config = function () {
    return {
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    };
};
