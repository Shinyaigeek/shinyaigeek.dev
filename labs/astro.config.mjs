import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  integrations: [react()],
  adapter: cloudflare({ mode: "directory" }),
});
