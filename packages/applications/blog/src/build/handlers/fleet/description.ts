import type { FleetContent } from "../../model/fleet/fleet.entity";
import { Language } from "../../model/language/language.entity";

/**
 * `description` is optional in a fleet's frontmatter, so this falls back to a
 * title-based one rather than leaving the page's <meta name="description"> and
 * its Markdown's summary empty.
 */
export const fleetDescription = (fleet: FleetContent, language: Language) =>
	fleet.metadata.description ??
	(language === Language.ja
		? `${fleet.metadata.title} - スライド形式のちょっとしたアイデアや学習記録`
		: `${fleet.metadata.title} - a quick idea or learning note in slide format`);
