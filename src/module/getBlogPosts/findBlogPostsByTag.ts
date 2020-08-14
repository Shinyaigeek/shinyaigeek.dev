import { Meta } from "../../utils/makeIndex/makeIndex";
import { HomeSlug } from "../getHomeSlug/getHomeSlug";

export const findBlogPostsByTag = (posts: Meta[], tag?: string) => {
    if(tag) {
        return posts.filter(post => post.tags.includes(tag))
    }
    return posts
}