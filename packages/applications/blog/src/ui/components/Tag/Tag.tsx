import type { ReactNode } from "react";
import tag from "./Tag.module.css";

export interface TagProps {
	child: ReactNode;
	slug: string;
	color: string;
}

export function Tag(props: TagProps) {
	return (
		<a href={props.slug} className={tag.tag}>
			{props.child}
		</a>
	);
}
