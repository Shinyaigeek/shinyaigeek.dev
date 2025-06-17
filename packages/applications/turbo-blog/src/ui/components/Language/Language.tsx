import type { FunctionComponent } from "react";
import {
	languageArrow,
	languageCheck,
	languageDropdown,
	languageName,
	language as languageStyle,
	languageTrigger,
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
	const currentLanguageInfo = languages.get(currentLanguage);

	return (
		<>
			<div className={languageWrapper}>
				<button
					type="button"
					className={languageTrigger}
					data-language-trigger
					aria-label="言語を選択"
					aria-expanded="false"
				>
					<span role="img" aria-label="current language">
						{currentLanguageInfo?.icon}
					</span>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={languageArrow}
						role="img"
						aria-label="ドロップダウン矢印"
					>
						<path
							d="M4 6L8 10L12 6"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
			<div
				className={languageDropdown}
				data-language-dropdown
				style={{ display: "none" }}
			>
				{Array.from(languages.keys()).map((language) => {
					const isActive = language === currentLanguage;
					return (
						<a
							key={language}
							href={`${
								language === "en"
									? "https://en.shinyaigeek.dev"
									: "http://ja.shinyaigeek.dev"
							}${currentPath}`}
							className={`${languageStyle} ${isActive ? "active" : ""}`}
						>
							<span role="img" aria-label="country">
								{languages.get(language)?.icon}
							</span>
							<span className={languageName}>
								{languages.get(language)?.name}
							</span>
							{isActive && (
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={languageCheck}
									role="img"
									aria-label="選択中"
								>
									<path
										d="M13.5 4.5L6 12L2.5 8.5"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)}
						</a>
					);
				})}
			</div>
		</>
	);
};
