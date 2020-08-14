import { Meta } from "../../utils/makeIndex/makeIndex";
import { HomeSlug } from "../getHomeSlug/getHomeSlug";
import { findBlogPostsByTag } from "./findBlogPostsByTag";

export const findBlogPosts = (posts: Meta[], slug: HomeSlug) => {
    if(!slug.page && !slug.tag) {
        return posts.slice(0, 10);
    }

    const sortedByTag = findBlogPostsByTag(posts, slug.tag);

    
}