import type { FunctionComponent } from "react";
// Global design tokens every component reads through var(). Imported here
// because Layout wraps every page.
import "../../styles/tokens.css";
import { Footer } from "../Footer/Footer";
import { ShinyaigeekPortrait } from "../ShinyaigeekPortrait/ShinyaigeekPortrait";
import { Header } from "../header/header";
import { inner, root } from "./Layout.module.css";

/**
 * Which page is being rendered, so the header can mark the matching nav item.
 * A union rather than a string: the header used to test for values ("home",
 * "post") that no page ever passed, so nothing was ever marked active.
 */
export type PageKind =
	| "home"
	| "post"
	| "profile"
	| "activity"
	| "fleets"
	| "fleet";

interface LayoutProps {
	language: "ja" | "en";
	currentPath: string;
	page: PageKind;
	children: React.ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({
	language,
	currentPath,
	page,
	children,
}) => (
	<div className={root}>
		<Header language={language} currentPath={currentPath} page={page} />
		<div className={inner}>{children}</div>
		<ShinyaigeekPortrait />
		<Footer />
	</div>
);
