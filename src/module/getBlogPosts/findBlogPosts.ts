import { Meta } from "../../utils/makeIndex/makeIndex";
import { HomeSlug } from "../getHomeSlug/getHomeSlug";
import { findBlogPostsByTag } from "./findBlogPostsByTag";
import { findBlogPostsByPage } from "./findBlogPostsByPage";

export const findBlogPosts = (posts: Meta[], slug: HomeSlug) => {
  const sortedByTag = findBlogPostsByTag(posts, slug.tag);

  return findBlogPostsByPage(sortedByTag, slug.page);
};
