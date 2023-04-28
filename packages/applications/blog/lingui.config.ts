import { formatter } from "@lingui/format-json"

export default {
    locales: ['en', 'ja'],
    catalogs: [
        {
            path: './src/locales/{locale}/messages',
            include: ['./src'],
        },
    ],
    format: formatter({ style: 'minimal' })
};
