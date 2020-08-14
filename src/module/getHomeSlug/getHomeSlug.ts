export interface HomeSlug {
  slug: string;
  tag?: string;
  page?: number;
}

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
