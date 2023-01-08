import { StarStream } from "../StartStream/StarStream";
import React from "react";
import { Shinyaigeek } from "../../../components/Shinyaigeek/Shinyaigeek";
import welcomePage from "./WelcomePage.module.scss";

export function WelcomePage() {
	return (
		<div className={welcomePage.welcome}>
			<img
				className={welcomePage.banana}
				src={`/assets/static/banana.png`}
				alt="banana"
				width="200px"
				height="200px"
			/>
			<Shinyaigeek css={welcomePage.shinyaigeek} />
			<StarStream />
		</div>
	);
}
