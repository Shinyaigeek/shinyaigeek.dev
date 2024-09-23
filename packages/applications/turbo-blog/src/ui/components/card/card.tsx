import type { FunctionComponent } from "react";

interface Props {
	text: string;
}

export const Card: FunctionComponent<Props> = function ({ text }) {
	return <div>{text}</div>;
};
