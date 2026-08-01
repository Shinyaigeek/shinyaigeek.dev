import { buildFastifyServer } from "./server";

(async function main() {
	const server = await buildFastifyServer();
	const port = Number(process.env.PORT) || 3000;

	await server.ready();
	server.listen({ port, host: "0.0.0.0" });
})().catch((err) => {
	console.error(err);
	process.exit(1);
});
