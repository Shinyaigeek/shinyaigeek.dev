import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import { FleetCard } from "../../components/fleet-card";
import {
	container,
	description,
	emptyState,
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
		description:
			"アイデアや学習の記録、ちょっとした発見をスライド形式で共有します",
		emptyTitle: "Coming Soon",
		emptyBody: "Fleet の準備中です。しばらくお待ちください。",
	},
	en: {
		description: "Ideas, notes and small findings, shared as slides.",
		emptyTitle: "Coming Soon",
		emptyBody: "No fleets in English yet. Check back later.",
	},
} as const;

export const FleetIndex: FunctionComponent<Props> = ({ fleets, language }) => {
	const copy = COPY[language];

	return (
		<div className={container}>
			<header className={header}>
				<h1 className={title}>Fleets</h1>
				<p className={description}>{copy.description}</p>
			</header>

			{fleets.length > 0 ? (
				<div className={fleetGrid}>
					{fleets.map((fleet) => (
						<FleetCard key={fleet.path} fleet={fleet} language={language} />
					))}
				</div>
			) : (
				<div className={emptyState}>
					<h3>{copy.emptyTitle}</h3>
					<p>{copy.emptyBody}</p>
				</div>
			)}
		</div>
	);
};
