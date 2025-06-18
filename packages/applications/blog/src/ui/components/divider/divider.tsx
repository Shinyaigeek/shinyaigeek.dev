import type { FunctionComponent } from "react";
import { bold, divider, dotted, subtle } from "./divider.module.css";

interface DividerProps {
	variant?: "default" | "subtle" | "bold" | "dotted";
	className?: string;
}

export const Divider: FunctionComponent<DividerProps> = ({
	variant = "default",
	className = "",
}) => {
	const getVariantClass = () => {
		switch (variant) {
			case "subtle":
				return subtle;
			case "bold":
				return bold;
			case "dotted":
				return dotted;
			default:
				return "";
		}
	};

	return (
		<hr className={`${divider} ${getVariantClass()} ${className}`.trim()} />
	);
};
