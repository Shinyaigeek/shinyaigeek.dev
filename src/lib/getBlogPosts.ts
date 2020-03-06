import { Entry } from "./getBlogPost";
import fetch from "node-fetch";

interface HomeSlug {
  slug: string;
  tag?: string;
  page?: number;
}

export const getBlogPosts = (query: HomeSlug) => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
  if (!CONTENTFUL_ACCESS_TOKEN || !CONTENTFUL_SPACE_ID) {
    throw new Error("Please check env variable");
  }
  console.log(query);
  let url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=blog&limit=10&order=-sys.createdAt`;
  if (query.tag) {
    url += `&fields.tags[all]=${query.tag}`;
  }
  if (query.page) {
    url += `&skip=${(query.page - 1) * 10}`;
  }
  const page = query.page ?? 1;

  return fetch(url)
    .then(item => {
      return item
        .json()
        .then(entries => {
          return {
            items: entries.items as Entry[],
            prev: entries.skip !== 0 && page - 1,
            next: entries.skip + entries.limit < entries.total && page + 1
          };
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

export const getHomeSlug = (target: string) => {
  const ques = target.search(/\?/g);
  const res: HomeSlug = {
    slug: ""
  };
  if (ques === -1) {
    res.slug = target.replace("/", "");
  } else {
    const queries = target.slice(ques + 1).split("&");
    queries.forEach(query => {
      if (query.includes("page")) {
        res.page = Number(query.split("=")[1]);
      }
      if (query.includes("tag")) {
        res.tag = query.split("=")[1];
      }
    });

    res.slug = target.replace(/\?.*/g, "").replace("/", "");
  }
  return res;
};
