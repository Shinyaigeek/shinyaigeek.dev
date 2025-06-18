import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import {
	active,
	header,
	meta,
	navButton,
	navigation,
	progress,
	progressBar,
	slide,
	slideContainer,
	slideIndicator,
	tag,
	tags,
	title,
	viewer,
} from "./fleet-viewer.module.css";

interface Props {
	fleet: FleetContent;
}

export const FleetViewer: FunctionComponent<Props> = ({ fleet }) => {
	return (
		<div className={viewer} data-fleet-viewer>
			<header className={header}>
				<h1 className={title}>{fleet.metadata.title}</h1>
				<div className={meta}>
					<time dateTime={fleet.metadata.publishedAt}>
						{new Date(fleet.metadata.publishedAt).toLocaleDateString("ja-JP")}
					</time>
					<span>{fleet.slides.length} slides</span>
				</div>
				{fleet.metadata.tags && fleet.metadata.tags.length > 0 && (
					<div className={tags}>
						{fleet.metadata.tags.map((tagName) => (
							<span key={tagName} className={tag}>
								{tagName}
							</span>
						))}
					</div>
				)}
			</header>

			<div className={navigation}>
				<button type="button" className={navButton} data-fleet-prev>
					← Previous
				</button>
				<div className={slideIndicator} data-fleet-indicator>
					1 / {fleet.slides.length}
				</div>
				<button type="button" className={navButton} data-fleet-next>
					Next →
				</button>
			</div>

			<div className={progressBar}>
				<div
					className={progress}
					data-fleet-progress
					style={{ width: `${(1 / fleet.slides.length) * 100}%` }}
				/>
			</div>

			<div className={slideContainer}>
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
		</div>
	);
};
