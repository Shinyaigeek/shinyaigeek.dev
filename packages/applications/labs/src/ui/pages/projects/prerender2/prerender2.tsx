import type { FunctionComponent } from "react";
import { HeadComponent } from "../../../components/head/head";
import { HeaderComponent } from "../../../components/header/header";

import "../../../styles/global.css";
import styles from "./prerender2.module.css";

interface Props {
	builtAssets: {
		css: string;
	};
}

export const Prerender2PageComponent: FunctionComponent<Props> = ({
	builtAssets,
}) => (
	<html lang="ja">
		<head>
			<HeadComponent builtAssets={builtAssets} />
			<script type="speculationrules">
				{`{ "prerender": [{ "source": "list", "urls": ["/projects/prerender2/subpage/"] }] }`}
			</script>
		</head>
		<body>
			<HeaderComponent />
			<main className={styles.prerender2}>
				<div>
					{/* The trailing slash is load bearing: a prerendered page is only
					    reused when the navigation URL matches the speculation rule
					    exactly, and h2o redirects the slashless path to this one. */}
					Prerender2 go to <a href="/projects/prerender2/subpage/">subpage</a>
				</div>
			</main>
		</body>
	</html>
);
