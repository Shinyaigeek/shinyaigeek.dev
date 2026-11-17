import type { FunctionComponent, ReactNode } from "react";
import { siteOrigin } from "../../../universal/site-origin";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import { FleetCard } from "../../components/fleet-card";
import {
	container,
	description,
	emptyBody,
	emptyState,
	emptyTitle,
	eyebrow,
	fleetGrid,
	header,
	title,
} from "./fleet-index.module.css";

interface Props {
	fleets: FleetContent[];
	language: "ja" | "en";
}

const COPY = {
	ja: {
		eyebrow: "Slides",
		description:
			"アイデアや学習の記録、ちょっとした発見を、数枚のスライドにして置いています。",
		emptyTitle: "まだ Fleet はありません",
		emptyBody: "準備中です。しばらくお待ちください。",
	},
	en: {
		eyebrow: "Slides",
		description: "Ideas, notes and small findings, a few slides at a time.",
		emptyTitle: "No fleets in English yet",
		emptyBody: (
			<>
				Check back later, or read{" "}
				<a href={`${siteOrigin("ja")}/fleets/`} hrefLang="ja">
					the Japanese ones
				</a>{" "}
				in the meantime.
			</>
		),
	},
} satisfies Record<
	Props["language"],
	Record<"eyebrow" | "description" | "emptyTitle", string> & {
		emptyBody: ReactNode;
	}
>;

/** Frontmatter dates come as "2024-01-15" or "2024/01/15"; both sort as text. */
const newestFirst = (a: FleetContent, b: FleetContent) =>
	b.publishedAt
		.replace(/\//g, "-")
		.localeCompare(a.publishedAt.replace(/\//g, "-"));

export const FleetIndex: FunctionComponent<Props> = ({ fleets, language }) => {
	const copy = COPY[language];

	return (
		<div className={container}>
			<header className={header}>
				<p className={eyebrow}>{copy.eyebrow}</p>
				<h1 className={title}>Fleets</h1>
				<p className={description}>{copy.description}</p>
			</header>

			{fleets.length > 0 ? (
				<div className={fleetGrid}>
					{[...fleets].sort(newestFirst).map((fleet) => (
						<FleetCard key={fleet.path} fleet={fleet} language={language} />
					))}
				</div>
			) : (
				<div className={emptyState}>
					<p className={emptyTitle}>{copy.emptyTitle}</p>
					<p className={emptyBody}>{copy.emptyBody}</p>
				</div>
			)}
		</div>
	);
};
