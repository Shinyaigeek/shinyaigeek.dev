import React from "react";
import button from "./Button.module.scss";

interface Props {
	id: string;
	children: React.ReactChild;
}

export function Button(props: Props) {
	return (
		<div id={props.id} className={button.button}>
			{props.children}
		</div>
	);
}
