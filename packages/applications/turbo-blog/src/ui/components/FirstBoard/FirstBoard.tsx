import type { FunctionComponent } from "react";
import { ShinyaigeekPortrait } from "../ShinyaigeekPortrait/ShinyaigeekPortrait";
import { ShinyaigeekCoreProfile } from "../shinyaigeek-core-profile/shinyaigeek-core-profile";
import {
	container,
	heroSection,
	profileSection,
	shinyaigeekPortraitPosition,
} from "./FirstBoard.module.css";

export const FirstBoard: FunctionComponent = () => (
	<div className={container}>
		<div className={heroSection}>
			<ShinyaigeekCoreProfile />
		</div>
		<div className={profileSection}>
			<div className={shinyaigeekPortraitPosition}>
				<ShinyaigeekPortrait />
			</div>
		</div>
	</div>
);
