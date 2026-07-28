import { Language } from "../model/language/language.entity";

/**
 * The route prefix a language's pages are registered under.
 *
 * Japanese owns the unprefixed routes and English mirrors them under "/en", so
 * that each language gets its own entries in the router.
 */
export const languagePrefix = (language: Language): "" | "/en" =>
	language === Language.ja ? "" : "/en";

/**
 * Strips that prefix back off, turning a route path into the path within a
 * language's own directory.
 *
 * English routes are registered as "/en/post/" so they get their own entries,
 * but the language already chooses the output directory, so the prefix has to
 * come off -- otherwise the English blog index lands in public/en/en/post/ and
 * en.shinyaigeek.dev/post/ is a 404, which is exactly what used to happen.
 *
 * Anchored on purpose: a plain replace("/en", "") would also eat the "/en" in a
 * slug like "/post/enumerable/".
 */
export const sitePath = (path: string) =>
	path.replace(/^\/en(?=\/|$)/, "") || "/";
