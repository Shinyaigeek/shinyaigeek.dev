export default {
    locales: ['en', 'ja'],
    catalogs: [
        {
            path: './src/locales/{locale}/messages',
            include: ['./src'],
        },
    ],
    format: 'minimal',
};
