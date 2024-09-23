import type { FunctionComponent } from "react";
import {
	glitch,
	hello,
	jobGlitch,
	mail,
	mySnsBox,
	name,
	snsIcon,
	word,
} from "./ShinyaigeekCoreProfile.module.css";

export const ShinyaigeekCoreProfile: FunctionComponent = () => (
	<div className="baseprofile">
		<div className={hello}>
			Hi{" "}
			<span role="img" aria-label="wave hand">
				👋
			</span>{" "}
			I'm{" "}
			<span className={name}>Shinobu Hayashi a.k.a Shinyaigeek(しにゃい)</span>.
		</div>
		<div className={jobGlitch}>
			<span data-text="Web Developer" className={glitch}>
				Web Developer
			</span>{" "}
			<g-emoji fallback-src="/assets/static/spider_web.png" alias="spider-web">
				🕸
			</g-emoji>{" "}
			/{" "}
			<span data-text="Reliable web Enthusiast" className={glitch}>
				Reliable Web Enthusiast
			</span>{" "}
			<g-emoji fallback-src="/assets/static/fire.png" alias="fire">
				🔥
			</g-emoji>{" "}
		</div>
		<div className={word}>
			Faster, Lighter, More accessible, More secure, More productive Web for
			anyone, anytime , anywhere.
		</div>
	</div>
);
