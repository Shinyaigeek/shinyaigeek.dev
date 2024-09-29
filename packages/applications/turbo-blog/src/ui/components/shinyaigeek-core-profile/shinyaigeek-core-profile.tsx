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
} from "./shinyaigeek-core-profile.module.css";

export const ShinyaigeekCoreProfile: FunctionComponent = function () {
	return (
	<div className="baseprofile">
		<h1>About Me</h1>
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
		<div className={mySnsBox}>
			<div className={snsIcon}>
				<a id="twitter" href="https://twitter.com/Shinyaigeek">
					<img
						src={"/assets/static/twitter.svg"}
						alt="twitter"
						width="54px"
						height="54px"
					/>
				</a>
			</div>
			<div className={snsIcon}>
				<a id="github" href="https://github.com/Shinyaigeek">
					<img
						src={"/assets/static/github.svg"}
						alt="github"
						width="54px"
						height="54px"
					/>
				</a>
			</div>
			<div className={snsIcon}>
				<a id="linkedin" href="https://www.linkedin.com/in/shinyaigeek/">
					<img
						src={"/assets/static/linkedin.svg"}
						alt="linkedin"
						width="54px"
						height="54px"
					/>
				</a>
			</div>
		</div>
		<div className={mail}>
			<a href="mailto:me@shinyaigeek.dev">
				Contact Me on Email{" "}
				<g-emoji fallback-src="/assets/static/email.png" alias="email">
					📧
				</g-emoji>
			</a>
		</div>
	</div>
);
}
