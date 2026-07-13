import type { FunctionComponent } from "react";
import {
	alterEgoFrame,
	alterEgoFrameWrapper,
	alterEgoSection,
} from "./alter-ego.module.css";

interface Props {
	// Which per-language embed page to load: the ja page speaks (and expects)
	// Japanese, the en page English — matching the language of the hosting page.
	language: "ja" | "en";
}

const COPY = {
	ja: {
		description:
			"Shinyaigeek の分身（AI）と日本語で会話できます。",
	},
	en: {
		description: "Chat in English with an AI alter ego of Shinyaigeek.",
	},
} as const;

export const AlterEgo: FunctionComponent<Props> = ({ language }) => (
	<section className={alterEgoSection}>
		<h2>Talk with my Alter Ego</h2>
		<p>{COPY[language].description}</p>
		<div className={alterEgoFrameWrapper}>
			<iframe
				className={alterEgoFrame}
				src={`https://alterego.shinyaigeek.dev/embed/${language}`}
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
