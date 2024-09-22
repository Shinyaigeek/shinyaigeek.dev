import type { FunctionComponent } from "react";
import { ShinyaigeekPortrait } from "../../../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import {
	container,
	shinyaigeekPortraitPosition,
} from "./FirstBoard.module.css";

export const FirstBoard: FunctionComponent = () => (
	<div className={container}>
		<div className={shinyaigeekPortraitPosition}>
			<ShinyaigeekPortrait />
		</div>
	</div>
);
