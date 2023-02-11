import fastify from 'fastify';

export async function buildFastifyServer(): Promise<ReturnType<typeof fastify>> {
    const server = fastify();

    return server;
}