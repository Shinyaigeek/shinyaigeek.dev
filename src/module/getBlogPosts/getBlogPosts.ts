import { HomeSlug } from "../getHomeSlug/getHomeSlug"
import { Meta } from "../../utils/makeIndex/makeIndex"
import assert from "assert"

export const getBlogPosts: (slug: HomeSlug) => Promise<Meta[]> = (slug) => {
    assert(process.env.BLOG_POSTS_INDEX_URL, "oops !! there is no BLOG_POSTS_INDEX_URL. please check env.")
    return fetch(process.env.BLOG_POSTS_INDEX_URL).then(res => {
        return res.json().then((json: Meta[]) => {
            
        })
    })
}