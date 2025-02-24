import type { Story } from "@ladle/react";
import { LanguageContext } from "../../../../context/language-context";
import { AboutMe } from "./about-me";

export const AboutMeJaStory: Story = function () {
	return (
		<LanguageContext.Provider value="ja">
			<AboutMe />
		</LanguageContext.Provider>
	);
};

export const AboutMeEnStory: Story = function () {
	return (
		<LanguageContext.Provider value="en">
			<AboutMe />
		</LanguageContext.Provider>
	);
};
