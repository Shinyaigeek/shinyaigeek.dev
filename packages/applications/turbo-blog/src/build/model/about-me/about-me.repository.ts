import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Language } from "../language/language.entity";
import type { AboutMe } from "./about-me.entity";
import { parseAboutMeContent } from "./parse-about-me-content";

export class AboutMeRepository {
	private readonly profileDir: string;

	constructor(profileDir: string) {
		this.profileDir = profileDir;
	}

	async getAboutMe(language: Language): Promise<AboutMe> {
		const langCode = language === Language.ja ? "ja" : "en";
		const aboutMeDir = join(this.profileDir, "about-me");
		const filePath = join(aboutMeDir, `${langCode}.md`);

		try {
			const content = await readFile(filePath, "utf-8");
			return await parseAboutMeContent(content);
		} catch (error) {
			throw new Error(
				`Failed to load about-me content for language ${langCode}: ${error}`,
			);
		}
	}
}
