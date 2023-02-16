'use strict';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': typescriptEslint,
            'eslint-plugin': eslintPlugin,
            import: eslintPluginImport,
            unicorn: eslintPluginUnicorn,
        },
        rules: {
            ...eslintPlugin.configs['rules-recommended'].rules,
            ...typescriptEslint.configs['recommended'].rules,
            'no-caller': 'error',
            'no-duplicate-imports': 'error',
            'no-iterator': 'error',
            'no-multi-str': 'warn',
            'no-proto': 'error',
            'no-undef-init': 'error',
            'no-unneeded-ternary': 'error',
            'no-useless-call': 'warn',
            'no-useless-computed-key': 'warn',
            'no-useless-concat': 'warn',
            'no-useless-constructor': 'warn',
            'no-useless-rename': 'warn',
            'no-var': 'warn',
            'object-shorthand': 'warn',
            'prefer-arrow-callback': 'warn',
            'prefer-rest-params': 'warn',
            'prefer-spread': 'warn',
            'prefer-template': 'warn',
            'no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    argsIgnorePattern: '^_', // Sort with TypeScript compiler's builtin linter.
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_', // Allow `catch (_e) {...}`
                },
            ],
            'import/no-default-export': 'warn',
            'import/order': [
                'warn',
                {
                    'newlines-between': 'ignore',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: false,
                    },
                },
            ],
            'unicorn/expiring-todo-comments': [
                'error',
                {
                    terms: ['todo', 'fixme'],
                    ignore: [/issues\/\d+/i, /#\d+/i],
                },
            ],
            'unicorn/filename-case': [
                'error',
                {
                    // We follow https://google.github.io/styleguide/jsguide.html#file-name
                    cases: {
                        kebabCase: true,
                        snakeCase: true,
                    },
                },
            ],
        },
    },
];
