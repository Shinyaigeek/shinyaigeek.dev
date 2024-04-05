import React, { type FunctionComponent } from "react";
import { HeadComponent } from "../../../components/head/head";
import { HeaderComponent } from "../../../components/header/header";

import "../../../styles/global.css";
import styles from "./prerender2.module.css";

export const Prerender2PageComponent: FunctionComponent = () => (
	<html lang="ja">
		<head>
			<HeadComponent />
			<script type="speculationrules">
				{`{ "prerender": [{ "source": "list", "urls": ["/projects/prerender2/subpage/"] }] }`}
			</script>
		</head>
		<body>
			<HeaderComponent />
			<main className={styles.prerender2}>
				<div>
					Prerender2 go to <a href="/projects/prerender2/subpage">subpage</a>
				</div>
			</main>
		</body>
	</html>
);
