import type { FunctionComponent } from "react";
import { SNSItem } from "../SNSItem/SNSItem";
import {
	earth,
	earthX,
	earthY,
	fixedPortrait,
	portraitButton,
	portraitContainer,
	shinyaigeekPortrait,
	shinyaigeekPortraitContainer,
	shinyaigeekPortraitImage,
	snsLinks,
	snsLinksContainer,
} from "./ShinyaigeekPortrait.module.css";

export const ShinyaigeekPortrait: FunctionComponent = () => (
	<div className={fixedPortrait}>
		<div className={portraitContainer}>
			<button
				className={portraitButton}
				popovertarget="sns-links"
				popovertargetaction="toggle"
				aria-label="SNS Links"
				type="button"
			>
				<div className={shinyaigeekPortrait}>
					<div className={shinyaigeekPortraitContainer}>
						<img
							src={"/assets/static/icon_transparent.png"}
							className={shinyaigeekPortraitImage}
							alt="shinyaigeek's portrait icon"
							width="270"
							height="270"
						/>
					</div>
					<div className={earth}>
						<div className={earthX}>
							<div className={earthY}>
								<img
									src={"/assets/static/earth.png"}
									alt="earth"
									width="50"
									height="50"
								/>
							</div>
						</div>
					</div>
				</div>
			</button>
			<div id="sns-links" popover="auto" className={snsLinks}>
				<div className={snsLinksContainer}>
					<SNSItem
						href="https://twitter.com/Shinyaigeek"
						label="Twitter"
						iconSrc="/assets/static/x-logo-white.png"
						iconAlt="X"
					/>
					<SNSItem
						href="https://github.com/Shinyaigeek"
						label="GitHub"
						iconSrc="/assets/static/github.svg"
						iconAlt="GitHub"
						isIconInverted={true}
					/>
					<SNSItem
						href="https://www.linkedin.com/in/shinyaigeek/"
						label="LinkedIn"
						iconSrc="/assets/static/linkedin.png"
						iconAlt="LinkedIn"
					/>
					<SNSItem
						href="mailto:me@shinyaigeek.dev"
						label="Email"
						iconSrc="/assets/static/e-mail.png"
						iconAlt="Email"
					/>
				</div>
			</div>
		</div>
	</div>
);
