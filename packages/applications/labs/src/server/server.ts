import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { LABS_OUTPUT_DIRECTORY } from "../../tools/build-utility";

export async function buildFastifyServer(): Promise<
	ReturnType<typeof fastify>
> {
	const server = fastify();

	server.register(fastifyStatic, {
		root: LABS_OUTPUT_DIRECTORY,
	});

	return server;
}
