import type { FunctionComponent } from "react";
import button from "./button.module.css";

interface Props {
	children: React.ReactNode;
}

export const Button: FunctionComponent<Props> = function (props: Props) {
	return (
		<button className={button.button} type="button">
			{props.children}
		</button>
	);
};
