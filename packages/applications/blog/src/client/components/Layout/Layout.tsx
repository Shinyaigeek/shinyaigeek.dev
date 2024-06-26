import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import layout from "./Layout.module.css";

// biome-ignore lint: reason
export function Layout(Component: (props?: any) => JSX.Element) {
	// biome-ignore lint: reason
	return (props?: any) => (
		<div className={layout.root}>
			<Header
				language={props.language}
				currentPath={props.currentPath}
				page={props.page}
			/>
			<div className={layout.inner}>
				<Component {...props} />
			</div>
			<Footer />
		</div>
	);
}
