import React from "react";
import styles from "./DecorationTag.module.css";

interface Props {
	tags: string[];
}

export function DecorationTag({ tags }: Props) {
	return (
		<div className={styles.tag}>
			{tags.map((tag) => {
				return <div key={`decorationTag__${tag}`}>{tag}</div>;
			})}
		</div>
	);
}
