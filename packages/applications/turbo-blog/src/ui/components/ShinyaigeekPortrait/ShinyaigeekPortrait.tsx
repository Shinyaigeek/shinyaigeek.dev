import type { FunctionComponent } from "react";
import {
	earth,
	earthX,
	earthY,
	shinyaigeekPortrait,
	shinyaigeekPortraitContainer,
	shinyaigeekPortraitImage,
} from "./ShinyaigeekPortrait.module.css";

export const ShinyaigeekPortrait: FunctionComponent = () => (
	<div className={shinyaigeekPortrait}>
		<div className={shinyaigeekPortraitContainer}>
			<img
				src={"/assets/static/shinyaigeek_portrait_transparent.png"}
				className={shinyaigeekPortraitImage}
				alt="shinyaigeek's portrait icon"
				width="270px"
				height="270px"
			/>
		</div>
		<div className={earth}>
			<div className={earthX}>
				<div className={earthY}>
					<img
						src={"/assets/static/earth.png"}
						alt="earth"
						width="50px"
						height="50px"
					/>
				</div>
			</div>
		</div>
	</div>
);
