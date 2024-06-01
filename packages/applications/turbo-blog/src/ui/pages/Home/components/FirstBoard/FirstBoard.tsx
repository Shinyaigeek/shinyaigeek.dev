import type { FunctionComponent } from "react";
import { ShinyaigeekPortrait } from "../../../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { StarStream } from "../StartStream/StarStream";
import { banana, container, shinyaigeek } from "./FirstBoard.module.css";

export const FirstBoard: FunctionComponent = () => (
	<div className={container}>
		<img
			className={banana}
			src={"/assets/static/banana.png"}
			alt="banana"
			width="200px"
			height="200px"
		/>
		<ShinyaigeekPortrait css={shinyaigeek} />
		<StarStream />
	</div>
);
