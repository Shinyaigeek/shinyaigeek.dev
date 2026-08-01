# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a monorepo for Shinyaigeek's tech blog (https://shinyaigeek.dev) using pnpm workspaces.

- **packages/applications/blog/** — the blog itself: React SSG built with Rspack
- **packages/applications/labs/** — experimental projects showcase: a React SSG built with webpack, served at labs.shinyaigeek.dev
- **packages/applications/worker/** — Cloudflare Worker that redirects English-preferring visitors to the English host
- **packages/modules/build-tool/** — shared Rspack and webpack base configs, exported as TypeScript source, plus the dev server both apps are served from
- **packages/modules/markdown-parser/** — standalone markdown AST mapper (not yet wired into the blog)
- **packages/modules/ssg-router/** — the routing utilities the blog's and labs' static generation are both built on

The blog serves Japanese and English content, parses markdown with unified/remark/rehype, and renders every page to static HTML at build time.

### How the blog build fits together

1. `generate:tcm` writes a `*.module.css.d.ts` next to each stylesheet. Components use **named** imports from CSS modules, so these generated files are what lets them typecheck. They are committed; changing a stylesheet without rerunning this fails CI.
2. `build:client` bundles `src/client/main.tsx` for the browser. It doubles as the stylesheet entry — the server build targets node and emits no CSS, so every page component has to be reachable from there for its styles to reach the extracted stylesheet.
3. `build:server` bundles `src/build/build.ts`, which `invoke:ssg` then runs to emit `public/`.
4. `copy:assets` copies static assets into `public/assets/`.

Rspack's **native** CSS support handles both extraction and CSS modules — there is no CssExtractRspackPlugin, css-loader or postcss-loader in the chain.

### The dev loop

`pnpm dev` in either app runs `scripts/dev.ts` under tsx. It keeps both bundles
in watch mode, reruns the generation when its input changes, and serves the
generated tree with a live-reload snippet injected into every HTML response.
A change costs roughly **2s** in the blog and **0.1s** in labs.

Ports come from `BLOG_PORT` (default 3000, English takes the next one) and
`LABS_PORT` (default 3002). They are named per app rather than the conventional
`PORT` because the root `pnpm dev` runs both in one shell, where a single
`PORT` would put labs on the blog's.

What reruns depends on what changed:

| changed | blog | labs |
| --- | --- | --- |
| a stylesheet | typings, client bundle, server bundle, generation | both bundles, generation |
| a component | server bundle, generation | server bundle, generation |
| an article or a fleet | generation only | — |
| a static asset | copy | — |

Markdown is why the blog watches directories directly: articles, fleets and
profile entries are read from disk *while generating*, so no bundler ever sees
them change. Labs has no such content — everything it renders is TypeScript and
reaches the server bundle.

Two things about it are worth knowing before changing it:

- **The dev server mounts directories the way h2o does**, and that is the whole
  reason it exists rather than `rspack serve`. Pages are generated into
  `public/ja` and `public/en` with the bundles in `public/assets`, and each
  language is its own host in production with the site at its root. Serving
  `public/` as one root puts the site at `/ja/`, where every root-absolute link
  in it 404s. So the blog gets a port per language rather than one port with an
  `/en` prefix, and a directory requested without its trailing slash gets a 301
  rather than the index, exactly as h2o answers it.
- **OG images are not generated in dev.** There is one per route, each a satori
  layout rasterised by resvg at 1920x1080, and together they are nine of a
  generation's ten seconds. `scripts/dev.ts` sets `SSG_SKIP_OG_IMAGES=1`,
  which `src/build/build.ts` reads to leave those routes unregistered — so
  `<path>ogp.png` 404s in dev. Run `pnpm build` to see them.

The shared parts — the static server, the live-reload transport, the watch and
debounce helpers — live in `build-tool/dev-server` and are imported by both
apps' `scripts/dev.ts`.

### Design tokens

Tokens live in `blog/src/ui/styles/tokens.css`, a plain (non-module) stylesheet keyed off `html` / `html[data-theme="..."]`. Keep them out of `.module.css` files: CSS Modules scopes custom properties to the file that declares them, so a token declared in a module gets a hashed name while `var(--token)` in every other component keeps the literal name and silently stops resolving.

## Development Commands

### Root
```bash
pnpm dev           # blog on :3000/:3001 and labs on :3002, all watching
pnpm dev:blog      # just the blog
pnpm dev:labs      # just labs
pnpm lint          # oxlint
pnpm lint:fix      # oxlint --fix
pnpm format        # oxfmt, writes in place
pnpm format:check  # oxfmt --check
pnpm typecheck     # tsc --noEmit in every package
pnpm test          # vitest in every package that has tests
pnpm run ci        # all of the above, the way CI runs them
```

`ci` is the one script that needs `pnpm run`: bare `pnpm ci` hits pnpm's own
built-in `ci` command, which fails with `ERR_PNPM_CI_NOT_IMPLEMENTED` without
ever reaching the script.

`pnpm.overrides` in the root package.json pins **rollup** to 4.62.2. From 4.62.3
its prebuilt Linux binary needs GLIBC 2.32, which is newer than the dev machine
(Ubuntu 20.04, GLIBC 2.31) has, so vitest dies with `ERR_DLOPEN_FAILED` on every
`pnpm test`. CI runs on ubuntu-latest and is unaffected — drop the override once
the dev machine is on a newer glibc.

### Blog (packages/applications/blog/)
```bash
pnpm dev            # watch everything, 日本語 on :3000 and English on :3001
pnpm build          # clean, generate:tcm, client, server, SSG, copy assets
pnpm test           # vitest
pnpm typecheck      # tsc --noEmit
pnpm generate:tcm   # regenerate *.module.css.d.ts
pnpm components-catalogue:serve  # ladle
```

Set `GITHUB_TOKEN` to include the contribution calendar on `/activity/`. Without it the build warns and renders the page without the calendar rather than failing.

### Labs (packages/applications/labs/)
```bash
pnpm --filter labs dev       # watch everything, served on :3002
pnpm --filter labs build     # clean, client, server, SSG
pnpm --filter labs preview   # fastify over an already built public/ on :3000
pnpm --filter labs typecheck
```

Labs is generated the same way the blog is, one size down:

1. `build:client` bundles `src/client/index.ts` into `public/assets/`. Nothing
   loads that JS — the entry exists only to reference each page component so
   its stylesheet import reaches MiniCssExtractPlugin's extracted CSS, which is
   what the pages actually link to.
2. `build:server` bundles `src/build/build.ts` into `dist/`, and `invoke:ssg`
   runs it to write the HTML tree into `public/`.

So `public/` is the site and `dist/` is scaffolding: only `public/` is
deployed. Each route is written as `<route>/index.html`, because h2o serves the
directory — and `/projects/prerender2/`'s speculation rules only prerender the
subpage if the link's URL matches the rule's exactly, trailing slash included.

The stylesheet is content hashed, so its name is only known after `build:client`
has run; the built-assets plugin reads it out of `public/assets/` at generation
time and hands it to the handlers through the router context.

### Worker
```bash
pnpm --filter worker worker:build  # wrangler dry-run bundle
pnpm --filter worker worker:publish
```

## TypeScript

The repo is on **TypeScript 7**, the native port, which changes two things worth
knowing before adding a package or a dependency:

- It no longer includes every `@types/*` package it happens to find under
  `node_modules`. Name `@types/node` in `compilerOptions.types` the way
  markdown-parser, ssg-router and build-tool do — importing from `node:` is not
  enough on its own to pull it in.
- Inside `node_modules` it resolves a `.ts`/`.tsx` source ahead of the `.d.ts`
  generated next to it, and `skipLibCheck` only ever skips `.d.ts`. That is why
  `@ladle/react` is redirected to `blog/src/types/ladle.d.ts` through `paths` —
  it publishes its typings as `.tsx`, which do not compile against React 19.

The build configs are TypeScript but no longer go through ts-node, which cannot
drive TypeScript 7's compiler API: rspack reads its config natively, and
webpack-cli reads labs' config through **tsx**, which uses esbuild and so does
not depend on the `typescript` package at all. Both apps' `scripts/dev.ts` run
under tsx for the same reason, and import those configs directly.

## Code Quality

**oxlint** (`.oxlintrc.json`) runs the correctness, suspicious and perf categories with the typescript, unicorn, oxc, react and import plugins. A few rules are disabled with the reason recorded inline. To suppress a single site use `// oxlint-disable-next-line <rule> -- why`, and always give the reason — keep it on one line, or the directive applies to the comment instead of the code.

**oxfmt** (`.oxfmtrc.json`) formats JS/TS with tabs, an 80 column target and double quotes. It deliberately skips:

- **markdown** — these are published articles and markdown-parser's test fixtures; formatting them would rewrite content and break snapshots
- **CSS** — the stylesheets are hand-indented with 4 spaces and are load-bearing
- **package.json** — pnpm owns the formatting of those
- **`src/assets/`** — the HTML in there is demo pages embedded in articles, hand
  written and hand formatted, the same as the markdown around them

## Deployment

`.github/workflows/deploy_blog.yml` builds the blog and copies `public/` to the VPS over scp, where h2o serves it. It runs on every push to main, nightly at 03:00 JST to refresh the contribution calendar, and on demand. `ops/` holds the older shell-script equivalents plus the h2o config.

`.github/workflows/deploy_labs.yml` does the same for labs, into `/var/www/labs/public/`. It is a separate workflow on purpose: nothing in labs goes stale on its own, so it has no nightly run to share with the blog. Both use their own `concurrency` group, so they never race each other on the VPS.

Neither workflow creates its target directory — scp will not create the parent — and neither installs `ops/h2o.conf`. That still goes up by hand with `ops/update-h2o.sh`, followed by an h2o reload.

The Cloudflare Worker is deployed separately with `pnpm --filter worker worker:publish` and is not part of either workflow.
