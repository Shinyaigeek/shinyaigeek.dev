import type { Undefinable } from "option-t/esm/Undefinable";
import type { FunctionComponent } from "react";
import { FirstBoard } from "../../components/FirstBoard/FirstBoard";
import { Item } from "../../components/Item/Item";
import { Divider } from "../../components/divider/divider";
import { FleetCard } from "../../components/fleet-card";
import {
	blogGrid,
	blogSection,
	fleetGrid,
	fleetSection,
} from "./Home.module.css";

interface Props {
	items: {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
		ogp?: Undefinable<string>;
		media?: "speakerdeck" | "blog";
	}[];
	fleets?: {
		title: string;
		publishedAt: string;
		path: string;
		slideCount: number;
		tags?: string[];
	}[];
}

export const Home: FunctionComponent<Props> = ({ items, fleets = [] }) => (
	<div>
		<FirstBoard />
		<Divider />

		<section className={blogSection}>
			<h2>Latest Articles</h2>
			<div className={blogGrid}>
				{items.map((item) => (
					<Item
						key={item.path}
						title={item.title}
						description={item.description}
						publishedAt={item.publishedAt}
						path={item.path}
						ogp={item.ogp}
						media={item.media}
					/>
				))}
			</div>
		</section>

		{fleets.length > 0 && (
			<>
				<section className={fleetSection}>
					<h2>Latest Fleets</h2>
					<div className={fleetGrid}>
						{fleets.slice(0, 3).map((fleet) => (
							<FleetCard
								key={fleet.path}
								title={fleet.title}
								publishedAt={fleet.publishedAt}
								path={fleet.path}
								slideCount={fleet.slideCount}
								tags={fleet.tags}
							/>
						))}
					</div>
				</section>
				<Divider />
			</>
		)}
	</div>
);
