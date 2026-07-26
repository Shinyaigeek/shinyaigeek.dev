import type { Story } from "@ladle/react";
import { LanguageContext } from "../../context/language-context";
import { AboutMe } from "./about-me";

// AboutMe renders pre-rendered markdown, so the catalogue supplies its own
// snippet of HTML in place of the real article body.
const body =
	"<h2>About Me</h2><p>Web の performance と build tool が好きです.</p>";

export const AboutMeJaStory: Story = function () {
	return (
		<LanguageContext.Provider value="ja">
			<AboutMe body={body} />
		</LanguageContext.Provider>
	);
};

export const AboutMeEnStory: Story = function () {
	return (
		<LanguageContext.Provider value="en">
			<AboutMe body={body} />
		</LanguageContext.Provider>
	);
};
