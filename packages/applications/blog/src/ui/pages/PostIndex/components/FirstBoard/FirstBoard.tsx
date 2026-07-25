import type { FunctionComponent } from "react";
import { StarStream } from "../StartStream/StarStream";
import { banana, container } from "./FirstBoard.module.css";

// The portrait is rendered once, globally, by Layout — rendering it again here
// produced a second position: fixed copy and a duplicate `sns-links` popover id.
export const FirstBoard: FunctionComponent = () => (
	<div className={container}>
		<img
			className={banana}
			src={"/assets/static/banana.png"}
			alt="banana"
			width="200px"
			height="200px"
		/>
		<StarStream />
	</div>
);
