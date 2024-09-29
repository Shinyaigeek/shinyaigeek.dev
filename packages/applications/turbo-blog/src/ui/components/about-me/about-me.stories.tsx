import type { Story } from "@ladle/react";
import { AboutMe } from "./about-me";
import { LanguageContext } from "../../../../context/language-context";

export const AboutMeJaStory: Story = function () {
	return <LanguageContext.Provider value="ja"><AboutMe /></LanguageContext.Provider>
};

export const AboutMeEnStory: Story = function () {
	return <LanguageContext.Provider value="en"><AboutMe /></LanguageContext.Provider>
};
