import type { ServerResponse } from "http";
import path from "path";
import { buildFastifyServer } from "./server";

const MANIFEST_FILE_PATH = "build/server/manifest.json";

(async function main() {
  const server = await buildFastifyServer();
  const port = Number(process.env.PORT) || 3000;
  await server.ready();
  server.listen(port, "0.0.0.0");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
