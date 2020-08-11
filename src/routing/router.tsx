import UniversalRouter from "universal-router";
import { getBlogPosts, getHomeSlug } from "../lib/getBlogPosts";
import { Home } from "../pages/Home";
import React from "react"

const routes = [
    {
        path: "",
        action: () => {
            //TODO isThereContentJson
            const isThereContentJson = false;
            const slug = getHomeSlug(location.href);

            getBlogPosts(slug).then((items) => {
                if (!items) {
                    throw new Error();
                }
                return <Home items={ items.items } prev = { items.prev } next = { items.next } />;
            });
        },
    },
    // {
    //   path: "/profile",
    //   action: () => `<h1>Home</h1>`,
    // },
    // {
    //   path: "/post/:slug",
    //   action: (context: any) => `<h1>Post #${context.params.slug}</h1>`,
    // },
];

export const router = new UniversalRouter(routes);
