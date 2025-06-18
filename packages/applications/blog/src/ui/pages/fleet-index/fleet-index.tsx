import type { FunctionComponent } from "react";
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
	fleets: {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
		slideCount: number;
		tags?: string[];
	}[];
}

export const FleetIndex: FunctionComponent<Props> = ({ fleets }) => (
	<div className={container}>
		<header className={header}>
			<h1 className={title}>Fleets</h1>
			<p className={description}>
				アイデアや学習の記録、ちょっとした発見をスライド形式で共有します
			</p>
		</header>

		{fleets.length > 0 ? (
			<div className={fleetGrid}>
				{fleets.map((fleet) => (
					<FleetCard
						key={fleet.path}
						title={fleet.title}
						description={fleet.description}
						publishedAt={fleet.publishedAt}
						path={fleet.path}
						slideCount={fleet.slideCount}
						tags={fleet.tags}
					/>
				))}
			</div>
		) : (
			<div className={emptyState}>
				<h3>Coming Soon</h3>
				<p>Fleet の準備中です。しばらくお待ちください。</p>
			</div>
		)}
	</div>
);
