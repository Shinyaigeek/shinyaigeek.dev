import { Meta } from "../../utils/makeIndex/makeIndex";
import assert from "assert"

export const findBlogPostsByPage = (posts: Meta[], page?: number) => {
    assert(process.env.EACH_PAGE_NUM, "oops!! EACH_PAGE_NUM doesn't exist")
    const n = Number(process.env.EACH_PAGE_NUM)
    if(page) {
        return posts.slice(n * (page - 1), n * page)
    }

    return posts.slice(0, n)
}