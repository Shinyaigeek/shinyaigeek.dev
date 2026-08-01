import path from "node:path";

/**
 * Only the types this repo actually serves. A dev server for two static sites
 * does not need a full mime database as a dependency, and an unknown extension
 * falling back to application/octet-stream is a visible, easily fixed failure.
 */
const TYPES_BY_EXTENSION: Record<string, string> = {
	".avif": "image/avif",
	".css": "text/css; charset=utf-8",
	".gif": "image/gif",
	".htm": "text/html; charset=utf-8",
	".html": "text/html; charset=utf-8",
	".ico": "image/x-icon",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".js": "text/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".map": "application/json; charset=utf-8",
	".mjs": "text/javascript; charset=utf-8",
	".mp4": "video/mp4",
	".pdf": "application/pdf",
	".png": "image/png",
	".svg": "image/svg+xml",
	".ttf": "font/ttf",
	".txt": "text/plain; charset=utf-8",
	".webm": "video/webm",
	".webp": "image/webp",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".xml": "application/xml; charset=utf-8",
};

export const contentTypeOf = (filePath: string): string =>
	TYPES_BY_EXTENSION[path.extname(filePath).toLowerCase()] ??
	"application/octet-stream";

export const isHtml = (filePath: string): boolean =>
	path.extname(filePath).toLowerCase() === ".html";
