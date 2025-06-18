import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import { FleetViewer } from "../../components/fleet-viewer";
import { backLink, container, content } from "./fleet-detail.module.css";

interface Props {
	fleet: FleetContent;
}

export const FleetDetail: FunctionComponent<Props> = ({ fleet }) => (
	<div className={container}>
		<a href="/fleets/" className={backLink}>
			← Back to Fleets
		</a>

		<div className={content}>
			<FleetViewer fleet={fleet} />
		</div>
	</div>
);
