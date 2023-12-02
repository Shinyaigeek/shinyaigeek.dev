import { formatter } from '@lingui/format-po';

export default {
    locales: ['en', 'ja'],
    catalogs: [
        {
            path: './src/locales/{locale}/messages',
            include: ['./src'],
        },
    ],
    format: formatter({ explicitIdAsDefault: true }),
};
