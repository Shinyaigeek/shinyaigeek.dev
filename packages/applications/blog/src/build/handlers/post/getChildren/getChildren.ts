import { Router } from '../../../router/router';
import { handlePost } from '../handlePost/handlePost';
import { readContentsDirectory } from 'packages/applications/blog/src/contents-handler/contents-reader';

export const getChildren: () => Promise<Router> = async function () {
    const children = new Router();
    const posts = await readContentsDirectory('./articles/public');
    for (let post of posts) {
        children.on(`/${post.replace('.md', '')}`, handlePost, undefined);
    }

    return children;
};
