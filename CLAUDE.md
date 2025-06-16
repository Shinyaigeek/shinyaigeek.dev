# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a monorepo for Shinyaigeek's tech blog (https://shinyaigeek.dev) using pnpm workspaces. The project structure:

- **packages/applications/blog/** - Main blog application using React SSG with Webpack
- **packages/applications/turbo-blog/** - Alternative blog implementation using Rspack 
- **packages/applications/labs/** - Experimental projects showcase
- **packages/applications/worker/** - Cloudflare Worker for language routing
- **packages/modules/build-tool/** - Shared build configurations (Webpack/Rspack)
- **packages/modules/markdown-parser/** - Custom markdown parsing logic
- **packages/modules/ssg-router/** - Static site generation routing utilities

The blog supports internationalization (i18n) with Japanese and English content, uses custom markdown parsing, and generates static sites with SSR capabilities.

## Development Commands

### Root Level Commands
```bash
# Format code
pnpm format

# Lint all packages
pnpm lint

# Fix linting issues
pnpm lint:fix
```

### Blog Application (packages/applications/blog/)
```bash
# Development build and watch
pnpm dev

# Production build (includes CSS, RSS, sitemap, assets, OG images)
pnpm build

# Development build without OG images
pnpm build:dev

# Individual build steps
pnpm build:css      # Build CSS with Webpack
pnpm build:ssg      # Static site generation
pnpm build:rss      # Generate RSS feed
pnpm build:sitemap  # Generate sitemap
pnpm build:og-image # Generate OpenGraph images
pnpm mv:assets      # Copy assets to public directory

# Serve built site locally
pnpm serve

# i18n operations
pnpm i18n:extract   # Extract translatable strings
pnpm i18n:compile   # Compile translations
```

### Turbo Blog (packages/applications/turbo-blog/)
Uses Rspack instead of Webpack - check its package.json for specific build commands.

### Worker (packages/applications/worker/)
```bash
# Build Cloudflare Worker
pnpm worker:build

# Deploy to Cloudflare (requires wrangler auth)
pnpm worker:publish
```

## Code Quality

The project uses Biome for linting and formatting. Configuration includes:
- Targets `packages/` directory only
- Ignores `dist/`, `public/`, and `*.css.d.ts` files
- Arrow function complexity rules are disabled

## Deployment

Cloudflare Workers deployment is configured via `wrangler.toml`. The project includes deployment scripts in `ops/` directory for production deployment workflows.