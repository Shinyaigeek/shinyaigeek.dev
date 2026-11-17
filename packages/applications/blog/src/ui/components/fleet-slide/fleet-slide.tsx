import type { FunctionComponent } from "react";
import { body, surface } from "./fleet-slide.module.css";

interface Props {
	/** One slide's HTML, rendered from in-repo Markdown at build time. */
	html: string;
	className?: string;
}

/**
 * A slide shrunk to fit wherever it is put, for previewing a deck. It is a
 * picture of the slide rather than part of the page: inert, so a link inside it
 * can be neither focused nor clicked, and hidden from assistive technology,
 * which gets the card's own title instead.
 */
export const FleetSlideThumbnail: FunctionComponent<Props> = ({
	html,
	className,
}) => (
	<div
		className={className ? `${surface} ${className}` : surface}
		inert
		aria-hidden="true"
	>
		<div
			className={body}
			// Rendered from in-repo Markdown at build time.
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	</div>
);
