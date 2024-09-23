import type { FunctionComponent } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../header/header";
import { inner, root } from "./Layout.module.css";

interface LayoutProps {
	language: "ja" | "en";
	currentPath: string;
	page: string;
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
		<Footer />
	</div>
);
