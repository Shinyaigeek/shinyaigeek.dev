import type { FunctionComponent } from "react";
import { Language } from "../Language/Language";
import {
	anchor,
	contents,
	header,
	icon,
	title,
} from "./header.module.css";
import { HeaderAnchorItem } from "./header-anchor-item/header-anchor-item";

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
	<div className={header}>
		<div className={title}>
			<a href="/" className="link2Home">
				<div>
					<img
						src={"/assets/static/icon_transparent_header.png"}
						alt="icon"
						className={icon}
						width="36px"
						height="36px"
					/>
					shinyaigeek.dev
				</div>
			</a>
		</div>
		<div className={contents}>
			<div className={anchor}>
				<Language currentLanguage={language} currentPath={currentPath} />
			</div>
			<HeaderAnchorItem isActive={page === "home"} href="/" label="Profile" />
			<HeaderAnchorItem isActive={page === "post"} href="/post/" label="Blog" />
			<HeaderAnchorItem isActive={false} href="https://github-activity.shinyaigeek.dev/" label="Activity" />
		</div>
	</div>
);
