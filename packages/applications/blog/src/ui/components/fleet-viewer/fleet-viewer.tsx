import type { FunctionComponent } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import { body, readable, surface } from "../fleet-slide";
import {
	controls,
	counter,
	fullscreenButton,
	hint,
	navButton,
	segment,
	segmentButton,
	segments,
	slide,
	stage,
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
		goTo: (n: number) => `${n} 枚目へ`,
		fullscreen: "全画面で表示",
		hint: "← → キーかスワイプで移動、F キーで全画面",
	},
	en: {
		deck: "Slide deck",
		previous: "Previous slide",
		next: "Next slide",
		goTo: (n: number) => `Go to slide ${n}`,
		fullscreen: "Show full screen",
		hint: "Use ← → or swipe to move, F for full screen",
	},
} as const;

const Arrow: FunctionComponent<{ direction: "left" | "right" }> = ({
	direction,
}) => (
	<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
		<path
			d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const FullscreenIcon: FunctionComponent = () => (
	<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
		<path
			d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

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
			<div className={`${surface} ${stage}`} data-fleet-container>
				{fleet.slides.map((slideContent, index) => (
					<div
						// oxlint-disable-next-line react/no-array-index-key -- slide order is the identity here; the deck is rendered once and never reordered
						key={index}
						className={`${body} ${readable} ${slide}`}
						data-fleet-slide
						// past / current / future rather than a class: the client sets it,
						// and a hashed CSS Modules name is not something it can rebuild.
						// No id either, which would make #slide-3 scroll the page to it.
						data-state={index === 0 ? "current" : "future"}
						aria-hidden={index === 0 ? undefined : "true"}
						// Slide HTML is rendered from in-repo markdown at build time.
						dangerouslySetInnerHTML={{ __html: slideContent.content }}
					/>
				))}
			</div>

			<div className={controls}>
				<button
					type="button"
					className={navButton}
					data-fleet-prev
					aria-label={copy.previous}
					disabled
				>
					<Arrow direction="left" />
				</button>

				<ol className={segments}>
					{fleet.slides.map((_, index) => (
						// oxlint-disable-next-line react/no-array-index-key -- one segment per slide, in slide order
						<li key={index} className={segment}>
							<button
								type="button"
								className={segmentButton}
								data-fleet-goto={index}
								data-state={index === 0 ? "current" : "future"}
								aria-label={copy.goTo(index + 1)}
								aria-current={index === 0 ? "step" : undefined}
							/>
						</li>
					))}
				</ol>

				{/* Announced on change so the position is not sighted-only. */}
				<span className={counter} data-fleet-indicator aria-live="polite">
					{`1 / ${total}`}
				</span>

				<button
					type="button"
					className={navButton}
					data-fleet-next
					aria-label={copy.next}
					disabled={total <= 1}
				>
					<Arrow direction="right" />
				</button>

				{/* Shown by the client only where the Fullscreen API exists. */}
				<button
					type="button"
					className={`${navButton} ${fullscreenButton}`}
					data-fleet-fullscreen
					aria-label={copy.fullscreen}
					title={copy.fullscreen}
					aria-pressed="false"
					hidden
				>
					<FullscreenIcon />
				</button>
			</div>

			<p className={hint}>{copy.hint}</p>
		</section>
	);
};
