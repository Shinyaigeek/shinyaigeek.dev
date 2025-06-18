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
		<div className={`${anchor} ${isActive ? active : ""}`}>
			<a href={href} className="link2Home">
				{label}
			</a>
		</div>
	);
};
