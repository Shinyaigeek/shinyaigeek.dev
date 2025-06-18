import type { FunctionComponent } from "react";
import { Button as AriaButton } from "react-aria-components";
import button from "./button.module.css";

interface Props {
	children: React.ReactNode;
}

export const Button: FunctionComponent<Props> = function (props: Props) {
	return (
		<AriaButton className={button.button} type="button">
			{props.children}
		</AriaButton>
	);
};
