/**
 * The two languages the site is published in.
 *
 * Written as a const object rather than an enum so the value *is* the language
 * code. Every consumer needs "ja"/"en" — the lang attribute, the per-language
 * markdown file names, the output directory, the host name — and a numeric enum
 * meant re-deriving that code at each of those call sites.
 */
export const Language = {
	ja: "ja",
	en: "en",
} as const;

export type Language = (typeof Language)[keyof typeof Language];
