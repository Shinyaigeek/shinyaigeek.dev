# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a monorepo for Shinyaigeek's tech blog (https://shinyaigeek.dev) using pnpm workspaces.

- **packages/applications/blog/** — the blog itself: React SSG built with Rspack
- **packages/applications/labs/** — experimental projects showcase, built with webpack + fastify
- **packages/applications/worker/** — Cloudflare Worker that redirects English-preferring visitors to the English host
- **packages/modules/build-tool/** — shared Rspack and webpack base configs, exported as TypeScript source
- **packages/modules/markdown-parser/** — standalone markdown AST mapper (not yet wired into the blog)
- **packages/modules/ssg-router/** — the routing utilities the blog's static generation is built on

The blog serves Japanese and English content, parses markdown with unified/remark/rehype, and renders every page to static HTML at build time.

### How the blog build fits together

1. `generate:tcm` writes a `*.module.css.d.ts` next to each stylesheet. Components use **named** imports from CSS modules, so these generated files are what lets them typecheck. They are committed; changing a stylesheet without rerunning this fails CI.
2. `build:client` bundles `src/client/main.tsx` for the browser. It doubles as the stylesheet entry — the server build targets node and emits no CSS, so every page component has to be reachable from there for its styles to reach the extracted stylesheet.
3. `build:server` bundles `src/build/build.ts`, which `invoke:ssg` then runs to emit `public/`.
4. `copy:assets` copies static assets into `public/assets/`.

Rspack's **native** CSS support handles both extraction and CSS modules — there is no CssExtractRspackPlugin, css-loader or postcss-loader in the chain.

### Design tokens

Tokens live in `blog/src/ui/styles/tokens.css`, a plain (non-module) stylesheet keyed off `html` / `html[data-theme="..."]`. Keep them out of `.module.css` files: CSS Modules scopes custom properties to the file that declares them, so a token declared in a module gets a hashed name while `var(--token)` in every other component keeps the literal name and silently stops resolving.

## Development Commands

### Root
```bash
pnpm lint          # oxlint
pnpm lint:fix      # oxlint --fix
pnpm format        # oxfmt, writes in place
pnpm format:check  # oxfmt --check
pnpm typecheck     # tsc --noEmit in every package
pnpm test          # vitest in every package that has tests
pnpm ci            # all of the above, the way CI runs them
```

### Blog (packages/applications/blog/)
```bash
pnpm dev            # rspack dev server on :3000
pnpm build          # clean, generate:tcm, client, server, SSG, copy assets
pnpm test           # vitest
pnpm typecheck      # tsc --noEmit
pnpm generate:tcm   # regenerate *.module.css.d.ts
pnpm components-catalogue:serve  # ladle
```

Set `GITHUB_TOKEN` to include the contribution calendar on `/activity/`. Without it the build warns and renders the page without the calendar rather than failing.

### Labs and worker
```bash
pnpm --filter labs build           # webpack client + server
pnpm --filter worker worker:build  # wrangler dry-run bundle
pnpm --filter worker worker:publish
```

## Code Quality

**oxlint** (`.oxlintrc.json`) runs the correctness, suspicious and perf categories with the typescript, unicorn, oxc, react and import plugins. A few rules are disabled with the reason recorded inline. To suppress a single site use `// oxlint-disable-next-line <rule> -- why`, and always give the reason — keep it on one line, or the directive applies to the comment instead of the code.

**oxfmt** (`.oxfmtrc.json`) formats JS/TS with tabs, an 80 column target and double quotes. It deliberately skips:

- **markdown** — these are published articles and markdown-parser's test fixtures; formatting them would rewrite content and break snapshots
- **CSS** — the stylesheets are hand-indented with 4 spaces and are load-bearing
- **package.json** — pnpm owns the formatting of those

## Deployment

`.github/workflows/deploy_blog.yml` builds the blog and copies `public/` to the VPS over scp, where h2o serves it. It runs on every push to main, nightly at 03:00 JST to refresh the contribution calendar, and on demand. `ops/` holds the older shell-script equivalents plus the h2o config.

The Cloudflare Worker is deployed separately with `pnpm --filter worker worker:publish` and is not part of that workflow.
