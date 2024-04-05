import React, { type FunctionComponent } from "react";
import { HeadComponent } from "../../components/head/head";
import { HeaderComponent } from "../../components/header/header";
import "../../styles/global.css";
import styles from "./top.module.css";

interface Props {
	allProjects: string[];
}

export const TopPageComponent: FunctionComponent<Props> = ({ allProjects }) => (
	<html lang="ja">
		<head>
			<HeadComponent />
		</head>
		<body>
			<HeaderComponent />
			<main className={styles.top}>
				<h1>
					Labs playground for shinyaigeek's private study of web ecosystem
				</h1>
				{allProjects.map((project) => (
					<a href={`/projects/${project}/`}>{project}</a>
				))}
			</main>
		</body>
	</html>
);
