import type { FunctionComponent } from "react";
import {
	anchorItem,
	anchorList,
	anchorTitle,
	level1,
	level2,
	level3,
	level4,
	level5,
	level6,
	postAnchor,
} from "./floating-headings.module.css";

interface Props {
	anchors: {
		href: string;
		content: string;
	}[];
}

export const FloatingHeadings: FunctionComponent<Props> = function (props) {
	return (
		<details className={postAnchor}>
			<summary className={anchorTitle}>
				<span>📑 目次</span>
			</summary>
			<nav className={anchorList} aria-label="記事の目次">
				{props.anchors.map((anchor) => {
					const level = Number.parseInt(anchor.href.at(0) ?? "1");
					const levelClass =
						[level1, level2, level3, level4, level5, level6][level - 1] ||
						level1;

					return (
						<a
							key={anchor.href}
							href={`#${anchor.href}`}
							className={`${anchorItem} ${levelClass}`}
							data-level={level}
						>
							{anchor.content}
						</a>
					);
				})}
			</nav>
		</details>
	);
};
