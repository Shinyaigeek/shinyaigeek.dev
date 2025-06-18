import type { FunctionComponent } from "react";
import { button, icon } from "./ThemeToggle.module.css";

export const ThemeToggle: FunctionComponent = () => {
	return (
		<button
			type="button"
			className={button}
			data-theme-toggle
			aria-label="Toggle theme"
			title="Toggle theme"
		>
			<span className={icon} data-theme-icon>
				🌙
			</span>
		</button>
	);
};
