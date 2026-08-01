import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import { LABS_PUBLIC_DIRECTORY } from "../../tools/build-utility";

/**
 * Serves the generated site the way h2o does in production, so the preview
 * shows the tree that actually gets deployed rather than a second rendering
 * path that can drift away from it.
 */
export async function buildFastifyServer(): Promise<
	ReturnType<typeof fastify>
> {
	const server = fastify();

	server.register(fastifyStatic, {
		root: LABS_PUBLIC_DIRECTORY,
	});

	return server;
}
