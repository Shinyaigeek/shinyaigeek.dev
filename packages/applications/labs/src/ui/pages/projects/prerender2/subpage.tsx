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

export const Prerender2SubPageComponent: FunctionComponent<Props> = ({
	builtAssets,
}) => (
	<html lang="ja">
		<head>
			<HeadComponent builtAssets={builtAssets} />
		</head>
		<body>
			<HeaderComponent />
			<main className={styles.prerender2}>
				<div>Prerender2 sub page</div>
			</main>
		</body>
	</html>
);
