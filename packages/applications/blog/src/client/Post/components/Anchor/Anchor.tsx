interface Props {
	anchors: string[];
}
import { t } from "@lingui/macro";
import React from "react";
import postAnchor from "./Anchor.module.css";

export function Anchor(props: Props) {
	return (
		<details className={postAnchor.postAnchor}>
			<summary className="post--anchor__title" id="post--anchor__title">
				{t`index`}
			</summary>
			{props.anchors?.map((anchor, index) => {
				return (
					<a key={index} href={`#2__${index}`}>
						{anchor}
					</a>
				);
			})}
		</details>
	);
}
