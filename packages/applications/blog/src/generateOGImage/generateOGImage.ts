import path from 'path';
import { getBlogPosts } from '../build/util/getBlogPosts.js';
import { generateOGImageFromBlogPost } from './generateOGImageFromBlogPost.js';
import fs from 'fs/promises';
import { Entry } from '../build/util/getBlogPost.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const generateOGImage: () => Promise<void> = async function () {
    await fs.mkdir(path.join(__dirname, '../../public/assets/ogimage/ja'), {
        recursive: true,
    });
    await fs.mkdir(path.join(__dirname, '../../public/assets/ogimage/en'), {
        recursive: true,
    });

    const blogPosts = (['ja', 'en'] as const).flatMap((language) =>
        getBlogPosts(path.join(__dirname, '../articles/public/') as `${string}/`, language).map(
            (blogPost) => ({
                ...blogPost,
                language,
            })
        )
    ) as (Entry & { language: string })[];

    blogPosts.push({
        language: 'ja',
        // @ts-ignore
        fields: {
            title: "Shinyaigeek's blog",
            slug: 'top/',
        },
    });

    blogPosts.push({
        language: 'en',
        // @ts-ignore
        fields: {
            title: "Shinyaigeek's blog",
            slug: 'top/',
        },
    });

    blogPosts.push({
        language: 'ja',
        // @ts-ignore
        fields: {
            title: 'About Shinyaigeek',
            slug: 'profile/',
        },
    });

    blogPosts.push({
        language: 'en',
        // @ts-ignore
        fields: {
            title: 'About Shinyaigeek',
            slug: 'profile/',
        },
    });

    await Promise.all(
        blogPosts.map(async (blogPost) => {
            const pngData = await generateOGImageFromBlogPost({
                title: blogPost.fields.title,
            });

            fs.writeFile(
                path.join(
                    __dirname,
                    `../../public/assets/ogimage/${blogPost.language}/${blogPost.fields.slug.slice(
                        0,
                        -1
                    )}.png`
                ),
                pngData
            );
        })
    );
};

generateOGImage();
