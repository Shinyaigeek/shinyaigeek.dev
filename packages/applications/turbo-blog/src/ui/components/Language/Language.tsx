import type React from "react";
import type { FunctionComponent } from "react";
import {
	language as languageStyle,
	languageWrapper,
} from "./Language.module.css";

interface Props {
	currentLanguage: languageType;
	currentPath: string;
}

export type languageType = "ja" | "en";
// TODO
export const languages = new Map<
	languageType,
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

export const Language: FunctionComponent<Props> = ({
	currentLanguage,
	currentPath,
}) => {
	const currentLanguageLabel = currentLanguage === "ja" ? "日本語" : "English";
	return (
		<details>
			<summary>
				{" "}
				<span role="img" aria-label="language">
					<g-emoji fallback-src="/assets/static/earth_africa.png" alias="earth">
						🌍
					</g-emoji>
				</span>{" "}
				{currentLanguageLabel}
			</summary>
			<div className={languageWrapper}>
				{Array.from(languages.keys()).map((language) => {
					return (
						<a
							key={language}
							href={`${
								language === "en"
									? "https://en.shinyaigeek.dev"
									: "http://ja.shinyaigeek.dev"
							}${currentPath}`}
							className={`${languageStyle} ${
								language === currentLanguage ? "TODO" : ""
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
};
