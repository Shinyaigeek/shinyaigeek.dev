import type { FunctionComponent } from "react";
import { tagContainer, tagIcon, tagItem } from "./DecorationTag.module.css";

interface Props {
	tags: string[];
}

export const DecorationTag: FunctionComponent<Props> = function (props) {
	return (
		<div className={tagContainer} role="list" aria-label="記事のタグ">
			{props.tags.map((tag) => {
				return (
					<div
						key={`decorationTag__${tag}`}
						className={tagItem}
						role="listitem"
					>
						<span className={tagIcon}>#</span>
						{tag}
					</div>
				);
			})}
		</div>
	);
};
