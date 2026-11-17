import { footer } from "./Footer.module.css";

export function Footer() {
	// The year the page was generated. The site is rebuilt nightly, so this
	// turns over on its own instead of being a literal that goes stale.
	const year = new Date().getFullYear();
	return <div className={footer}>Copyright. {year} Shinyaigeek</div>;
}
