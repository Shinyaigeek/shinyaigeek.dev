import { Language } from "../Language/Language";
import {
	active,
	anchor,
	contents,
	header,
	icon,
	title,
} from "./Header.module.css";

export function Header({
	language,
	currentPath,
	page,
}: {
	language: "en" | "ja";
	currentPath: string;
	page: string;
}) {
	return (
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
				<div className={`${anchor} ${page === "home" ? active : ""}`}>
					<a href="/" className="link2Home">
						Blog
					</a>
				</div>
				<div className={`${anchor} ${page === "profile" ? active : ""}`}>
					<a href="/profile" id="link2profile">
						Profile
					</a>
				</div>
				<div className={`${anchor}`}>
					<a href="https://github-activity.shinyaigeek.dev/" id="link2activity">
						Activity
					</a>
				</div>
			</div>
		</div>
	);
}
