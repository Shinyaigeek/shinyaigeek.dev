export interface TagProps {
	child: React.ReactChild;
	slug: string;
	color: string;
}
import type React from "react";
import tag from "./Tag.module.css";

export function Tag(props: TagProps) {
	return (
		<a href={props.slug} className={tag.tag}>
			{props.child}
		</a>
	);
}
