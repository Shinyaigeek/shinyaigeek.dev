import type { FunctionComponent } from "react";
import { postAnchor } from "./Anchor.module.css";

interface Props {
	anchors: {
		href: string;
		content: string;
	}[];
}

export const Anchor: FunctionComponent<Props> = function (props) {
	return (
		<details className={postAnchor}>
			<summary className="post--anchor__title" id="post--anchor__title" />
			{props.anchors.map((anchor) => {
				return (
					<a key={anchor.href} href={`#${anchor.href}`}>
						{anchor.content}
					</a>
				);
			})}
		</details>
	);
};
