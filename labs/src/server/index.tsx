import { buildFastifyServer } from "./server";
import { TopPageRoutes } from './routes/index';

(async function main() {
  const server = await buildFastifyServer();
  const port = Number(process.env.PORT) || 3000;

  server.register(TopPageRoutes)

  await server.ready();
  server.listen(port, "0.0.0.0");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
