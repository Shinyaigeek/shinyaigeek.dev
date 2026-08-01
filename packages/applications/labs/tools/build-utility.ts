import path from "node:path";

/**
 * Build artifacts: the bundled SSG entry and the preview server. Never
 * deployed -- only `public/` is copied to the VPS.
 */
export const LABS_DIST_DIRECTORY = path.resolve(process.cwd(), "dist");

/**
 * The static site itself, which h2o serves at labs.shinyaigeek.dev.
 * `build:client` fills `assets/` and the SSG writes the HTML tree around it.
 */
export const LABS_PUBLIC_DIRECTORY = path.resolve(process.cwd(), "public");

/** Where the content hashed client bundle and its stylesheet land. */
export const LABS_ASSETS_DIRECTORY = path.join(LABS_PUBLIC_DIRECTORY, "assets");
