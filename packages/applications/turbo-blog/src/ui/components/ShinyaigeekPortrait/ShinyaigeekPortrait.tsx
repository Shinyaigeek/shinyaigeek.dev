import type { FunctionComponent } from "react";
import {
	earth,
	earthX,
	earthY,
	fixedPortrait,
	portraitButton,
	shinyaigeekPortrait,
	shinyaigeekPortraitContainer,
	shinyaigeekPortraitImage,
	snsItem,
	snsLinks,
} from "./ShinyaigeekPortrait.module.css";

export const ShinyaigeekPortrait: FunctionComponent = () => (
	<div className={fixedPortrait}>
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
			<a
				className={snsItem}
				href="https://twitter.com/Shinyaigeek"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Twitter"
			>
				<img
					src="/assets/static/twitter.svg"
					alt="Twitter"
					width="32"
					height="32"
				/>
			</a>
			<a
				className={snsItem}
				href="https://github.com/Shinyaigeek"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
			>
				<img
					src="/assets/static/github.svg"
					alt="GitHub"
					width="32"
					height="32"
				/>
			</a>
			<a
				className={snsItem}
				href="https://www.linkedin.com/in/shinyaigeek/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
			>
				<img
					src="/assets/static/linkedin.svg"
					alt="LinkedIn"
					width="32"
					height="32"
				/>
			</a>
			<a
				className={snsItem}
				href="mailto:me@shinyaigeek.dev"
				aria-label="Email"
			>
				<img
					src="/assets/static/email.png"
					alt="Email"
					width="32"
					height="32"
				/>
			</a>
		</div>
	</div>
);
