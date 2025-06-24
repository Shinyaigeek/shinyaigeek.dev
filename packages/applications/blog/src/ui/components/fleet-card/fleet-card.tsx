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
}

export const FleetCard: FunctionComponent<Props> = ({ fleet }) => (
	<a href={`/fleets/${fleet.path}`} className={card}>
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
				{new Date(fleet.publishedAt).toLocaleDateString("ja-JP")}
			</time>
			<span className={slideCount}>{fleet.slideCount} slides</span>
		</div>
	</a>
);
