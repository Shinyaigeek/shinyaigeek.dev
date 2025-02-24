import type { FunctionComponent } from "react";
import { Language } from "../Language/Language";
import { HeaderAnchorItem } from "./header-anchor-item/header-anchor-item";
import {
	contents,
	divider,
	header,
	icon,
	navigation,
	title,
	titleLink,
} from "./header.module.css";

interface HeaderProps {
	language: "en" | "ja";
	currentPath: string;
	page: string;
}

export const Header: FunctionComponent<HeaderProps> = ({
	language,
	currentPath,
	page,
}) => (
	<header className={header}>
		<div className={title}>
			<a href="/" className={titleLink}>
				<img
					src="/assets/static/icon_transparent_header.png"
					alt="shinyaigeek.dev logo"
					className={icon}
					width="36"
					height="36"
				/>
				<span>shinyaigeek.dev</span>
			</a>
		</div>
		<div className={contents}>
			<nav className={navigation} aria-label="メインナビゲーション">
				<HeaderAnchorItem isActive={page === "home"} href="/" label="Profile" />
				<span className={divider}>/</span>
				<HeaderAnchorItem
					isActive={page === "post"}
					href="/post/"
					label="Blog"
				/>
				<span className={divider}>/</span>
				<HeaderAnchorItem
					isActive={false}
					href="https://github-activity.shinyaigeek.dev/"
					label="Activity"
				/>
			</nav>
			<Language currentLanguage={language} currentPath={currentPath} />
		</div>
	</header>
);
