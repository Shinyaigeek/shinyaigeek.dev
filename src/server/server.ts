import fastify from "fastify";

import { getBlogPosts, getHomeSlug } from "./util/getBlogPosts";
import { getBlogPost } from "./util/getBlogPost";

import dotenv from "dotenv";

dotenv.config();

const app = fastify();

const port = process.env.SERVER_PORT ?? "8080";

const title = "しにゃいの学習帳";

app.get("/prefetch/post/:slug", async (req, res) => {
  const slug: string = req.params.slug ?? "";
  const post = await getBlogPost(slug);
  res.headers({
    "content-type": "application/json",
  });
  res.send(JSON.stringify(post))
})

app.get("/post/:slug", async (req, res) => {
  const slug: string = req.params.slug ?? "";

})

app.listen(port, (err, address) => {
  if (err) throw err;
});
