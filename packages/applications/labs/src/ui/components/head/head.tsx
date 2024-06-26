import React, { Fragment, type FunctionComponent } from "react";

declare const $CSS_BUILT_ASSET_FILENAME: string;

export const HeadComponent: FunctionComponent = () => (
	<Fragment>
		<title>Labs | shinyaigeek.dev</title>
		<link rel="stylesheet" href={`/${$CSS_BUILT_ASSET_FILENAME}`} />
	</Fragment>
);
