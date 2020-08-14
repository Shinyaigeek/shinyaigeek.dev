import fastify from "fastify"
import { getHomeSlug } from "../module/getHomeSlug/getHomeSlug";

const server = fastify();

server.get("/", async (req, res) => {
    const slug = getHomeSlug(req.url || "");
    
})