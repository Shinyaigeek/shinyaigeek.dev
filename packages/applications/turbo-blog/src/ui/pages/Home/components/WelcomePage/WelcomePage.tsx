import { Shinyaigeek } from "../../../../components/Shinyaigeek/Shinyaigeek";
import { StarStream } from "../StartStream/StarStream";
import welcomePage from "./WelcomePage.module.css";

export function WelcomePage() {
	return (
		<div className={welcomePage.welcome}>
			<img
				className={welcomePage.banana}
				src={"/assets/static/banana.png"}
				alt="banana"
				width="200px"
				height="200px"
			/>
			<Shinyaigeek css={welcomePage.shinyaigeek} />
			<StarStream />
		</div>
	);
}
