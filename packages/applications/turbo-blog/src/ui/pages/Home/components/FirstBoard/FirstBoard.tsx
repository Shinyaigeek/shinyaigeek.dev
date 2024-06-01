import type { FunctionComponent } from "react";
import { Shinyaigeek } from "../../../../components/Shinyaigeek/Shinyaigeek";
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
		<Shinyaigeek css={shinyaigeek} />
		<StarStream />
	</div>
);
