import type React from "react";
import languageStyle from "./Language.module.css";

interface Props {
	currentLanguage: language;
	currentPath: string;
}

export type language = "ja" | "en";
// TODO
export const languages = new Map<
	language,
	{
		name: string;
		icon: JSX.Element;
	}
>();
languages.set("ja", {
	name: "日本語",
	icon: (
		<g-emoji fallback-src="/assets/static/jp.png" alias="Japan">
			🇯🇵
		</g-emoji>
	),
});
languages.set("en", {
	name: "English",
	icon: (
		<span>
			<g-emoji fallback-src="/assets/static/us.png" alias="America">
				🇺🇸
			</g-emoji>
			<g-emoji fallback-src="/assets/static/gb.png" alias="United States">
				🇬🇧
			</g-emoji>
		</span>
	),
});

export const Language: React.FC<Props> = ({ currentLanguage, currentPath }) => (
	<details>
		<summary>
			{" "}
			<span role="img" aria-label="language">
				<g-emoji fallback-src="/assets/static/earth_africa.png" alias="earth">
					🌍
				</g-emoji>
			</span>{" "}
		</summary>
		<div className={languageStyle.languageWrapper}>
			{Array.from(languages.keys()).map((language) => {
				return (
					<a
						key={language}
						href={`${
							language === "en"
								? "https://en.shinyaigeek.dev"
								: "http://ja.shinyaigeek.dev"
						}${currentPath}`}
						className={`${languageStyle.language} ${
							language === currentLanguage ? languageStyle.active : ""
						}`}
					>
						<span role="img" aria-label="country">
							{languages.get(language)?.icon}
						</span>
						{languages.get(language)?.name}
					</a>
				);
			})}
		</div>
	</details>
);
