import fetch from 'node-fetch';
import { generateHash } from './generateHash.js';

require('dotenv').config();

export interface Entry {
    fields: {
        title: string;
        description: string;
        slug: string;
        publishedAt: string;
        tags: string[];
        content: string;
        hasEn: boolean;
    };
    sys: {
        updatedAt: string;
    };
}

export const getBlogPost = (target: string) => {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
    if (!(CONTENTFUL_ACCESS_TOKEN && CONTENTFUL_SPACE_ID)) {
        throw new Error('Please check env variable');
    }

    return fetch(
        `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=blog&fields.slug=${target}`
    )
        .then((item) => {
            return item
                .json()
                .then((entries) => {
                    const item = entries.items[0] as Entry;
                    const hash = generateHash(item.sys.updatedAt);
                    return [item, hash] as const;
                })
                .catch((err) => {
                    console.log(err);
                    return [false as false, -1] as const;
                });
        })
        .catch((err) => {
            console.log(err);
            return [false as false, -1] as const;
        });
};

export const getBlogSlug = (target: string) => {
    const res = target.replace(/\?.*/g, '').replace('/post/', '');
    return res;
};
