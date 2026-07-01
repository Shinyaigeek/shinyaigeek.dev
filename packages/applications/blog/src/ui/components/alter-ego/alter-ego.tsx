import type { FunctionComponent } from "react";
import {
	alterEgoFrame,
	alterEgoFrameWrapper,
	alterEgoSection,
} from "./alter-ego.module.css";

interface Props {
	heading?: string;
	description?: string;
}

export const AlterEgo: FunctionComponent<Props> = ({
	heading = "Talk with my Alter Ego",
	description = "Shinyaigeek の分身（AI）と会話できます。",
}) => (
	<section className={alterEgoSection}>
		<h2>{heading}</h2>
		<p>{description}</p>
		<div className={alterEgoFrameWrapper}>
			<iframe
				className={alterEgoFrame}
				src="https://alterego.shinyaigeek.dev/embed"
				title="Shinyaigeek Alter Ego"
				loading="lazy"
				// Marker for the client ThemeManager (src/client/main.tsx): it hands
				// the resolved light/dark scheme to the embed, which can't otherwise
				// know which theme the blog is showing. See syncAlterEgoFrame there.
				data-alterego-frame
			/>
		</div>
	</section>
);
