import type { FunctionComponent } from "react";
import { active, anchor } from "./header-anchor-item.module.css";

interface Props {
	isActive: boolean;
	href: string;
	label: string;
}

export const HeaderAnchorItem: FunctionComponent<Props> = function ({
	isActive,
	href,
	label,
}) {
	return (
		<div className={isActive ? `${anchor} ${active}` : anchor}>
			{/* The styling alone does not tell a screen reader which page it is on. */}
			<a
				href={href}
				className="link2Home"
				aria-current={isActive ? "page" : undefined}
			>
				{label}
			</a>
		</div>
	);
};
