import { Language } from "../../model/language/language.entity";
import { fleetChildren } from "../fleet/getFleetChildren/getFleetChildren";
import { blogChildren } from "../post/getBlogChildren/getBlogChildren";

/**
 * Every page points og:image at "<its path>ogp.png", so each of these mirrors a
 * page route exactly. They are the same lists with a different suffix, which is
 * why they are derived from the page resolvers rather than repeating the
 * repository plumbing -- an image route that drifted from its page route left
 * the page referencing an image nobody produced.
 */
export const getJapaneseOGImageChildren = () =>
	blogChildren(Language.ja, "/ogp.png");

export const getEnglishOGImageChildren = () =>
	blogChildren(Language.en, "/ogp.png");

export const getJapaneseFleetOGImageChildren = () =>
	fleetChildren(Language.ja, "/ogp.png");

export const getEnglishFleetOGImageChildren = () =>
	fleetChildren(Language.en, "/ogp.png");
