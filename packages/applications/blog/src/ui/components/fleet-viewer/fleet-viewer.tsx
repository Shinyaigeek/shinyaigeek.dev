import type { FunctionComponent } from "react";
import { useState } from "react";
import type { FleetContent } from "../../../build/model/fleet/fleet.entity";
import {
	active,
	description,
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
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) =>
			prev < fleet.slides.length - 1 ? prev + 1 : prev,
		);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
	};

	const progressPercentage = ((currentSlide + 1) / fleet.slides.length) * 100;

	return (
		<div className={viewer}>
			<header className={header}>
				<h1 className={title}>{fleet.metadata.title}</h1>
				<p className={description}>{fleet.metadata.description}</p>
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
				<button
					type="button"
					className={navButton}
					onClick={prevSlide}
					disabled={currentSlide === 0}
				>
					← Previous
				</button>
				<div className={slideIndicator}>
					{currentSlide + 1} / {fleet.slides.length}
				</div>
				<button
					type="button"
					className={navButton}
					onClick={nextSlide}
					disabled={currentSlide === fleet.slides.length - 1}
				>
					Next →
				</button>
			</div>

			<div className={progressBar}>
				<div className={progress} style={{ width: `${progressPercentage}%` }} />
			</div>

			<div className={slideContainer}>
				{fleet.slides.map((slideContent, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className={`${slide} ${index === currentSlide ? active : ""}`}
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: slideContent.content }}
					/>
				))}
			</div>
		</div>
	);
};
