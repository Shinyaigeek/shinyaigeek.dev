import type { FunctionComponent } from "react";
import { Language } from "../Language/Language";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { HeaderAnchorItem } from "./header-anchor-item/header-anchor-item";
import {
	contents,
	divider,
	hamburgerMenu,
	header,
	icon,
	mobileMenu,
	mobileNavigation,
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
	<>
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
					<HeaderAnchorItem
						isActive={page === "home"}
						href="/profile/"
						label="Profile"
					/>
					<span className={divider}>/</span>
					<HeaderAnchorItem isActive={page === "post"} href="/" label="Blog" />
					<span className={divider}>/</span>
					<HeaderAnchorItem
						isActive={false}
						href="https://github-activity.shinyaigeek.dev/"
						label="Activity"
					/>
				</nav>
				<button
					type="button"
					className={hamburgerMenu}
					data-hamburger-menu
					aria-label="メニューを開く"
					aria-expanded="false"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						data-hamburger-icon
						role="img"
						aria-label="ハンバーガーメニュー"
					>
						<path
							d="M3 12H21M3 6H21M3 18H21"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							data-menu-lines
						/>
					</svg>
				</button>
				<ThemeToggle />
				<Language currentLanguage={language} currentPath={currentPath} />
			</div>
		</header>
		<div className={mobileMenu} data-mobile-menu style={{ display: "none" }}>
			<nav className={mobileNavigation} aria-label="モバイルメニュー">
				<HeaderAnchorItem
					isActive={page === "home"}
					href="/profile/"
					label="Profile"
				/>
				<HeaderAnchorItem isActive={page === "post"} href="/" label="Blog" />
				<HeaderAnchorItem
					isActive={false}
					href="https://github-activity.shinyaigeek.dev/"
					label="Activity"
				/>
			</nav>
		</div>
	</>
);
