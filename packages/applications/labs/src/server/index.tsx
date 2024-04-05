import { TopPageRoutes } from "./routes/index";
import { Prerender2ProjectPageRoutes } from "./routes/projects/prerender2";
import { buildFastifyServer } from "./server";

(async function main() {
	const server = await buildFastifyServer();
	const port = Number(process.env.PORT) || 3000;

	server.register(TopPageRoutes);
	server.register(Prerender2ProjectPageRoutes);

	await server.ready();
	server.listen(port, "0.0.0.0");
})().catch((err) => {
	console.error(err);
	process.exit(1);
});
