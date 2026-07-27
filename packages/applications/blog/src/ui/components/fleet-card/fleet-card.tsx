import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import {
	card,
	meta,
	publishedAt,
	slideCount,
	tag,
	tags,
	title,
} from "./fleet-card.module.css";

interface Props {
	fleet: FleetContent;
	language: "ja" | "en";
}

const COPY = {
	ja: { slides: (count: number) => `${count} スライド`, locale: "ja-JP" },
	en: {
		slides: (count: number) => `${count} ${count === 1 ? "slide" : "slides"}`,
		locale: "en-US",
	},
} as const;

export const FleetCard: FunctionComponent<Props> = ({ fleet, language }) => {
	const copy = COPY[language];

	return (
		// The trailing slash matters: the pages live at /fleets/<slug>/, so without
		// it every card costs the reader a redirect.
		<a href={`/fleets/${fleet.path}/`} className={card}>
			<h3 className={title}>{fleet.title}</h3>
			{fleet.tags && fleet.tags.length > 0 && (
				<div className={tags}>
					{fleet.tags.map((tagName) => (
						<span key={tagName} className={tag}>
							{tagName}
						</span>
					))}
				</div>
			)}
			<div className={meta}>
				<time className={publishedAt} dateTime={fleet.publishedAt}>
					{new Date(fleet.publishedAt).toLocaleDateString(copy.locale)}
				</time>
				<span className={slideCount}>{copy.slides(fleet.slideCount)}</span>
			</div>
		</a>
	);
};
