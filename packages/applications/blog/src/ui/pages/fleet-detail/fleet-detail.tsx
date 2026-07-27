import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import { FleetViewer } from "../../components/fleet-viewer";
import { backLink, container, content } from "./fleet-detail.module.css";

interface Props {
	fleet: FleetContent;
	language: "ja" | "en";
}

const COPY = {
	ja: { back: "← Fleets 一覧へ" },
	en: { back: "← Back to Fleets" },
} as const;

export const FleetDetail: FunctionComponent<Props> = ({ fleet, language }) => (
	<div className={container}>
		<a href="/fleets/" className={backLink}>
			{COPY[language].back}
		</a>

		<div className={content}>
			<FleetViewer fleet={fleet} language={language} />
		</div>
	</div>
);
