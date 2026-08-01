import { Fragment, type FunctionComponent } from "react";

interface Props {
	builtAssets: {
		css: string;
	};
}

export const HeadComponent: FunctionComponent<Props> = ({ builtAssets }) => (
	<Fragment>
		<meta charSet="utf8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Labs | shinyaigeek.dev</title>
		<link rel="stylesheet" href={`/assets/${builtAssets.css}`} />
	</Fragment>
);
