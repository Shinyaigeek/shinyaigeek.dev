import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { replaceCodePlugin } from "vite-plugin-replace";
import { getAllProjects } from "./tools/get-all-projects.mjs";

const allProjects = getAllProjects();

export default defineConfig({
  output: "server",
  integrations: [react()],
  adapter: cloudflare({ mode: "directory" }),
  vite: {
    plugins: [
      replaceCodePlugin({
        replacements: [
          {
            from: "__LABS__ALL_PROJECTS__",
            to: JSON.stringify(allProjects),
          },
        ],
      }),
    ],
  },
});
