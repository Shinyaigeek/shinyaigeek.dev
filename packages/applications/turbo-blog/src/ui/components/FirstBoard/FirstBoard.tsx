import type { FunctionComponent } from "react";
import { ShinyaigeekPortrait } from "../ShinyaigeekPortrait/ShinyaigeekPortrait";
import { ShinyaigeekCoreProfile } from "../shinyaigeek-core-profile/shinyaigeek-core-profile";
import {
	container,
	shinyaigeekPortraitPosition,
} from "./FirstBoard.module.css";

export const FirstBoard: FunctionComponent = () => (
	<div className={container}>
		<ShinyaigeekCoreProfile />
		<div className={shinyaigeekPortraitPosition}>
			<ShinyaigeekPortrait />
		</div>
	</div>
);
