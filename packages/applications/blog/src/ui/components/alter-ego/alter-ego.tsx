import type { FunctionComponent } from "react";
import { Section } from "../section/section";
import { alterEgoFrame, alterEgoFrameWrapper } from "./alter-ego.module.css";

interface Props {
	// Which per-language embed page to load: the ja page speaks (and expects)
	// Japanese, the en page English — matching the language of the hosting page.
	language: "ja" | "en";
}

const COPY = {
	ja: {
		title: "Alter Ego と話す",
		description: "Shinyaigeek の分身（AI）と日本語で会話できます。",
	},
	en: {
		title: "Talk with my Alter Ego",
		description: "Chat in English with an AI alter ego of Shinyaigeek.",
	},
} as const;

export const AlterEgo: FunctionComponent<Props> = ({ language }) => (
	<Section
		eyebrow="Alter Ego"
		title={COPY[language].title}
		description={COPY[language].description}
	>
		<div className={alterEgoFrameWrapper}>
			{/* oxlint-disable-next-line react/iframe-missing-sandbox -- first-party
			    embed that needs scripts plus its own storage for chat/auth state.
			    Worth revisiting with an explicit token list once it is clear which
			    capabilities the embed actually relies on. */}
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
	</Section>
);
