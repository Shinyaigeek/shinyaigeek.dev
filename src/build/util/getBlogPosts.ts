import { Entry } from "./getBlogPost";
import fetch from "node-fetch";
import { generateHash } from "./generateHash";
import fs from "fs";
import fm from "front-matter";
interface HomeSlug {
  slug: string;
  tag?: string;
  page?: number;
}

export const __getBlogPosts: (dir: `${string}/`) => Entry[] = function (dir) {
  const slugs = fs.readdirSync(dir);
  const posts = slugs.map(
    (slug) =>
      [
        fs.readFileSync(`${dir}${slug}`, { encoding: "utf8" }),
        slug.replace(".md", "/"),
      ] as const
  );
  return posts
    .map(([post, slug]) => {
      const { attributes } = fm(post);
      return {
        fields: {
          ...(attributes as any),
          slug,
        },
        sys: {
          updatedAt: (attributes as any).updatedAt,
        },
      };
    })
    .sort((l, r) => {
      if (new Date(l.fields.publishedAt) > new Date(r.fields.publishedAt)) {
        return -1;
      }

      return 1;
    });
};

export const getBlogPosts = (query: HomeSlug) => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
  if (!CONTENTFUL_ACCESS_TOKEN || !CONTENTFUL_SPACE_ID) {
    throw new Error("Please check env variable");
  }
  let url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=blog&limit=10&order=-sys.createdAt&select=fields.description,fields.publishedAt,fields.title,fields.tags,fields.slug,sys.updatedAt`;
  if (query.tag) {
    url += `&fields.tags[all]=${query.tag}`;
  }
  if (query.page) {
    url += `&skip=${(query.page - 1) * 10}`;
  }
  const page = query.page ?? 1;

  return fetch(url)
    .then((item) => {
      return item
        .json()
        .then((entries) => {
          const items = entries.items as Entry[];
          const hash = generateHash(
            items.reduce((acc, cur) => acc + cur.sys.updatedAt, "")
          );
          return [
            {
              items: entries.items as Entry[],
              prev: entries.skip !== 0 && page - 1,
              next: entries.skip + entries.limit < entries.total && page + 1,
            },
            hash,
          ] as const;
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

export const getHomeSlug = (target: string) => {
  const ques = target.search(/\?/g);
  const res: HomeSlug = {
    slug: "",
  };
  if (ques === -1) {
    res.slug = target.replace("/", "");
  } else {
    const queries = target.slice(ques + 1).split("&");
    queries.forEach((query) => {
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
