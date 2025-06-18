import type { FunctionComponent } from "react";
import { ShinyaigeekCoreProfile } from "../shinyaigeek-core-profile/shinyaigeek-core-profile";
import { container, heroSection } from "./FirstBoard.module.css";

export const FirstBoard: FunctionComponent = () => (
	<div className={container}>
		<div className={heroSection}>
			<ShinyaigeekCoreProfile />
		</div>
	</div>
);
