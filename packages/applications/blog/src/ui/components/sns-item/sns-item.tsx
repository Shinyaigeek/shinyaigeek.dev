import type { FunctionComponent } from "react";
import { snsItem, snsItemIconInvert } from "./sns-item.module.css";

export interface SNSItemProps {
	href: string;
	label: string;
	iconSrc: string;
	iconAlt: string;
	iconWidth?: string;
	iconHeight?: string;
	isIconInverted?: boolean;
}

export const SNSItem: FunctionComponent<SNSItemProps> = ({
	href,
	label,
	iconSrc,
	iconAlt,
	iconWidth = "32",
	iconHeight = "32",
	isIconInverted = false,
}) => (
	<a
		className={snsItem}
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={label}
	>
		<img
			src={iconSrc}
			alt={iconAlt}
			className={isIconInverted ? snsItemIconInvert : undefined}
			width={iconWidth}
			height={iconHeight}
		/>
	</a>
);
