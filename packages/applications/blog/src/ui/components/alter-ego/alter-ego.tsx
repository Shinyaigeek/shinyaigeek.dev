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
			<iframe
				className={alterEgoFrame}
				src={`https://alterego.shinyaigeek.dev/embed/${language}`}
				title="Shinyaigeek Alter Ego"
				loading="lazy"
				/*
				 * Each token is here because the embed provably needs it:
				 *   allow-scripts        it is a client-rendered app
				 *   allow-same-origin    /api/session is fetched with credentials,
				 *                        and without this the frame gets an opaque
				 *                        origin, which breaks its own storage too
				 *   allow-forms          the sign-in flow posts a form
				 *   allow-popups         auth opens /embed-auth via window.open
				 *   ...-to-escape-sandbox  that popup is a top-level window doing a
				 *                        redirect dance; inheriting the sandbox would
				 *                        block it from navigating itself
				 *   allow-storage-access-by-user-activation
				 *                        it calls document.requestStorageAccess()
				 *
				 * Withheld, and the point of the attribute: the frame cannot navigate
				 * the blog out from under the reader, start downloads, or raise modal
				 * dialogs that look like ours.
				 *
				 * Linters flag allow-scripts + allow-same-origin together, and rightly
				 * so for a *same-origin* frame: it could reach parent.document, strip
				 * the sandbox attribute and reload itself unsandboxed. This frame is on
				 * another origin (alterego.shinyaigeek.dev), so that reach throws and
				 * the escape does not exist. Dropping either token instead was tried
				 * and breaks the embed outright.
				 */
				// oxlint-disable-next-line react/iframe-missing-sandbox -- see above
				sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
				// Marker for the client ThemeManager (src/client/main.tsx): it hands
				// the resolved light/dark scheme to the embed, which can't otherwise
				// know which theme the blog is showing. See syncAlterEgoFrame there.
				data-alterego-frame
			/>
		</div>
	</Section>
);
