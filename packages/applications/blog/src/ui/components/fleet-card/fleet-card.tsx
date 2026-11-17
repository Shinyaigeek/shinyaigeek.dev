import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import { FleetSlideThumbnail } from "../fleet-slide";
import {
	card,
	count,
	deck,
	link,
	meta,
	separator,
	tag,
	tags,
	thumbnail,
	title,
} from "./fleet-card.module.css";

interface Props {
	fleet: FleetContent;
	language: "ja" | "en";
}

interface MetaProps extends Props {
	/** The card already shows the count on its deck. */
	withCount?: boolean;
}

const COPY = {
	ja: { slides: (n: number) => `${n} 枚` },
	en: { slides: (n: number) => `${n} ${n === 1 ? "slide" : "slides"}` },
} as const;

/** "2024-01-15" as "2024/01/15", the way the rest of the site writes dates. */
const formatDate = (date: string) => date.replace(/-/g, "/");

/** Date, length and tags: the line under a fleet's title, here and on its page. */
export const FleetMeta: FunctionComponent<MetaProps> = ({
	fleet,
	language,
	withCount = true,
}) => (
	<div className={meta}>
		<time dateTime={fleet.publishedAt.replace(/\//g, "-")}>
			{formatDate(fleet.publishedAt)}
		</time>
		{withCount && (
			<>
				<span className={separator} aria-hidden="true">
					·
				</span>
				<span>{COPY[language].slides(fleet.slideCount)}</span>
			</>
		)}
		{fleet.tags && fleet.tags.length > 0 && (
			<ul className={tags}>
				{fleet.tags.map((tagName) => (
					<li key={tagName} className={tag}>
						{tagName}
					</li>
				))}
			</ul>
		)}
	</div>
);

export const FleetCard: FunctionComponent<Props> = ({ fleet, language }) => {
	const cover = fleet.slides[0];

	return (
		<article className={card}>
			<div className={deck} data-depth={Math.min(fleet.slideCount, 3)}>
				{cover && (
					<FleetSlideThumbnail html={cover.content} className={thumbnail} />
				)}
				<span className={count}>{COPY[language].slides(fleet.slideCount)}</span>
			</div>
			<h2 className={title}>
				{/* The trailing slash matters: the pages live at /fleets/<slug>/, so
				    without it every card costs the reader a redirect. The link's
				    ::after covers the whole card, which keeps the thumbnail -- whose
				    slide may hold links of its own -- out of the anchor. */}
				<a href={`/fleets/${fleet.path}/`} className={link}>
					{fleet.title}
				</a>
			</h2>
			<FleetMeta fleet={fleet} language={language} withCount={false} />
		</article>
	);
};
