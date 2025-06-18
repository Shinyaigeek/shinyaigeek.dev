import type { FunctionComponent } from "react";
import {
	card,
	description,
	meta,
	publishedAt,
	slideCount,
	tag,
	tags,
	title,
} from "./fleet-card.module.css";

interface Props {
	title: string;
	description: string;
	publishedAt: string;
	slideCount: number;
	path: string;
	tags?: string[];
}

export const FleetCard: FunctionComponent<Props> = ({
	title: fleetTitle,
	description: fleetDescription,
	publishedAt: fleetPublishedAt,
	slideCount: fleetSlideCount,
	path,
	tags: fleetTags = [],
}) => (
	<a href={`/fleets/${path}`} className={card}>
		<h3 className={title}>{fleetTitle}</h3>
		<p className={description}>{fleetDescription}</p>
		{fleetTags.length > 0 && (
			<div className={tags}>
				{fleetTags.map((tagName) => (
					<span key={tagName} className={tag}>
						{tagName}
					</span>
				))}
			</div>
		)}
		<div className={meta}>
			<time className={publishedAt} dateTime={fleetPublishedAt}>
				{new Date(fleetPublishedAt).toLocaleDateString("ja-JP")}
			</time>
			<span className={slideCount}>{fleetSlideCount} slides</span>
		</div>
	</a>
);
