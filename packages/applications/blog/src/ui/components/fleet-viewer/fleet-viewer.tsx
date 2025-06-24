import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import {
	active,
	navigation,
	progress,
	progressBar,
	slide,
	slideContainer,
	slideIndicator,
	title,
	viewer,
} from "./fleet-viewer.module.css";

interface Props {
	fleet: FleetContent;
}

export const FleetViewer: FunctionComponent<Props> = ({ fleet }) => {
	return (
		<div className={viewer} data-fleet-viewer>
			<div className={slideContainer} data-fleet-container>
				<div className={title}>{fleet.metadata.title}</div>
				{fleet.slides.map((slideContent, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className={`${slide} ${index === 0 ? active : ""}`}
						data-fleet-slide
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: slideContent.content }}
					/>
				))}
			</div>

			<div className={navigation}>
				<div className={slideIndicator} data-fleet-indicator>
					1 / {fleet.slides.length}
				</div>
			</div>

			<div className={progressBar}>
				<div
					className={progress}
					data-fleet-progress
					style={{ width: `${(1 / fleet.slides.length) * 100}%` }}
				/>
			</div>
		</div>
	);
};
