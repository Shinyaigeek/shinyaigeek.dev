import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import {
	navButton,
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
	language: "ja" | "en";
}

const COPY = {
	ja: {
		deck: "スライド",
		previous: "前のスライド",
		next: "次のスライド",
		position: (current: number, total: number) => `${current} / ${total} 枚目`,
	},
	en: {
		deck: "Slide deck",
		previous: "Previous slide",
		next: "Next slide",
		position: (current: number, total: number) =>
			`Slide ${current} of ${total}`,
	},
} as const;

export const FleetViewer: FunctionComponent<Props> = ({ fleet, language }) => {
	const copy = COPY[language];
	const total = fleet.slides.length;

	return (
		<section
			className={viewer}
			data-fleet-viewer
			aria-roledescription={copy.deck}
			aria-label={fleet.metadata.title}
		>
			<div className={slideContainer} data-fleet-container>
				<div className={title}>{fleet.metadata.title}</div>
				{fleet.slides.map((slideContent, index) => (
					<div
						// oxlint-disable-next-line react/no-array-index-key -- slide order is the identity here; the deck is rendered once and never reordered
						key={index}
						className={slide}
						data-fleet-slide
						// Which slide is showing is a data attribute rather than a class:
						// the client used to rebuild the CSS module's hashed class name by
						// string surgery, which silently stopped matching when the hashing
						// scheme changed, leaving navigation dead.
						data-active={index === 0 ? "" : undefined}
						id={`slide-${index + 1}`}
						aria-hidden={index === 0 ? undefined : "true"}
						// Slide HTML is rendered from in-repo markdown at build time.
						dangerouslySetInnerHTML={{ __html: slideContent.content }}
					/>
				))}
			</div>

			<div className={navigation}>
				<button
					type="button"
					className={navButton}
					data-fleet-prev
					aria-label={copy.previous}
					disabled
				>
					←
				</button>
				{/* Announced on change so the position is not sighted-only. */}
				<div className={slideIndicator} data-fleet-indicator aria-live="polite">
					{copy.position(1, total)}
				</div>
				<button
					type="button"
					className={navButton}
					data-fleet-next
					aria-label={copy.next}
					disabled={total <= 1}
				>
					→
				</button>
			</div>

			<div className={progressBar}>
				<div
					className={progress}
					data-fleet-progress
					style={{ width: `${(1 / total) * 100}%` }}
				/>
			</div>
		</section>
	);
};
