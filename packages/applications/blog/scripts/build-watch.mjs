#!/usr/bin/env node
import { execSync } from "node:child_process";

console.log("🔧 Building...");

try {
	// TypeScript CSS Modules
	console.log("📝 Generating CSS modules...");
	execSync("pnpm generate:tcm", { stdio: "inherit" });

	// Server build
	console.log("⚙️  Building server...");
	execSync("pnpm build:server:rspack", { stdio: "inherit" });

	// SSG
	console.log("📄 Generating static pages...");
	execSync("pnpm invoke:ssg", { stdio: "inherit" });

	// Copy assets
	console.log("📋 Copying assets...");
	execSync("pnpm copy:assets", { stdio: "inherit" });

	console.log("✅ Build completed!");
} catch (error) {
	console.error("❌ Build failed:", error.message);
	process.exit(1);
}
