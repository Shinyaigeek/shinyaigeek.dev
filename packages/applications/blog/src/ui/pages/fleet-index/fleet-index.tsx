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
					<FleetCard key={fleet.path} fleet={fleet} />
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
