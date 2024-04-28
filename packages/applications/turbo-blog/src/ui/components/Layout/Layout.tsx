import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import layout from "./Layout.module.css";

interface LayoutProps {
	language: "ja" | "en";
	currentPath: string;
	page: string;
	children: React.ReactNode;
}

export function Layout({ language, currentPath, page, children }: LayoutProps) {
	return (
		<div className={layout.root}>
			<Header language={language} currentPath={currentPath} page={page} />
			<div className={layout.inner}>{children}</div>
			<Footer />
		</div>
	);
}
