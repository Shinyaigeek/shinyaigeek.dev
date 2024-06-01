import { Shinyaigeek } from "../../../../components/Shinyaigeek/Shinyaigeek";
import { StarStream } from "../StartStream/StarStream";
import { banana, shinyaigeek, welcome } from "./WelcomePage.module.css";

export function WelcomePage() {
	return (
		<div className={welcome}>
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
}
