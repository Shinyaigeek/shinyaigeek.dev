import React from "react";
import styles from "./DecorationTag.module.css";

interface Props {
	tags: string[];
}

export function DecorationTag({ tags }: Props) {
	return (
		<div className={styles.tag}>
			{tags.map((tag, index) => {
				return <div key={`decorationTag__${index}`}>{tag}</div>;
			})}
		</div>
	);
}
