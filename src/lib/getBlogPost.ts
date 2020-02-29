import * as contentful from "contentful";

import fetch from "node-fetch";

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
}

export const getBlogPost = async (target: string) => {
    const CONTENTFUL_ACCESS_TOKEN = "0MseOCl7HZlBMCXj1fRxau2oKopn7AcXMr-8onesj2U";
    const CONTENTFUL_SPACE_ID = "6ib5avrqb1b0";
//   const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
  if (!CONTENTFUL_ACCESS_TOKEN || !CONTENTFUL_SPACE_ID) {
    throw new Error("Please check env variable");
  }

  return fetch(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=blog&fields.slug=${target}`
  )
    .then(item => {
      return item
        .json()
        .then(entries => {
          return entries.items[0] as Entry;
        })
        .catch(err => {
          console.log(err);
          return false as false;
        });
    })
    .catch(err => {
      console.log(err);
      return false as false;
    });
};

export const getBlogSlug = (target: string) => {
  const res = target.replace(/\?.*/g, "").replace("/post/", "");
  return res;
};
