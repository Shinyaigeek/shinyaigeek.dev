import type { FunctionComponent } from "react";

interface Props {
	body: string;
}

export const AboutMe: FunctionComponent<Props> = function ({ body }) {
	return (
		<div
			// biome-ignore lint/security/noDangerouslySetInnerHtml: markdown content
			dangerouslySetInnerHTML={{ __html: body }}
		/>
	);
};
