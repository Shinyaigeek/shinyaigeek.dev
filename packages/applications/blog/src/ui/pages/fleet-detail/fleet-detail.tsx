import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import { FleetMeta } from "../../components/fleet-card";
import { FleetViewer } from "../../components/fleet-viewer";
import {
	backLink,
	container,
	header,
	heading,
} from "./fleet-detail.module.css";

interface Props {
	fleet: FleetContent;
	language: "ja" | "en";
}

const COPY = {
	ja: { back: "Fleets 一覧" },
	en: { back: "All fleets" },
} as const;

export const FleetDetail: FunctionComponent<Props> = ({ fleet, language }) => (
	<article className={container}>
		<header className={header}>
			<a href="/fleets/" className={backLink}>
				<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
					<path
						d="M15 5l-7 7 7 7"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{COPY[language].back}
			</a>
			<h1 className={heading}>{fleet.title}</h1>
			<FleetMeta fleet={fleet} language={language} />
		</header>

		<FleetViewer fleet={fleet} language={language} />
	</article>
);
