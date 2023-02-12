import { type FastifyPluginAsync } from "fastify";
import { renderToStaticMarkup } from 'react-dom/server';

export const TopPageRoutes: FastifyPluginAsync = async function(app) {
    app.get("/", async (req, res) => {
        const html = renderToStaticMarkup()
    })
}