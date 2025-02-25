import type { FunctionComponent } from "react";
import {
	glitch,
	hello,
	jobGlitch,
	mail,
	mySnsBox,
	name,
	skillTag,
	skillsSection,
	snsIcon,
	word,
} from "./shinyaigeek-core-profile.module.css";

export const ShinyaigeekCoreProfile: FunctionComponent = function () {
	return (
		<div className="baseprofile">
			<div className={hello}>
				Hi{" "}
				<span role="img" aria-label="wave hand">
					👋
				</span>{" "}
				I'm <span className={name}>Shinobu Hayashi a.k.a Shinyaigeek</span>
			</div>
			<div className={jobGlitch}>
				<span data-text="Software Engineer" className={glitch}>
					Software Engineer
				</span>{" "}
				<g-emoji
					fallback-src="/assets/static/spider_web.png"
					alias="spider-web"
				>
					🕸
				</g-emoji>{" "}
				/{" "}
				<span data-text="Reliable Web Enthusiast" className={glitch}>
					Reliable Web Enthusiast
				</span>{" "}
				<g-emoji fallback-src="/assets/static/fire.png" alias="fire">
					🔥
				</g-emoji>
			</div>
			<div className={word}>
				Crafting high-performance, accessible, and reliable web applications
				that deliver exceptional user experiences.
			</div>
			<div className={skillsSection}>
				<span className={skillTag}>TypeScript</span>
				<span className={skillTag}>React</span>
				<span className={skillTag}>Node.js</span>
				<span className={skillTag}>HTTP</span>
				<span className={skillTag}>Rust</span>
			</div>
			<div className={mySnsBox}>
				<div className={snsIcon}>
					<a
						id="twitter"
						href="https://twitter.com/Shinyaigeek"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={"/assets/static/twitter.svg"}
							alt="Twitter"
							width="54"
							height="54"
						/>
					</a>
				</div>
				<div className={snsIcon}>
					<a
						id="github"
						href="https://github.com/Shinyaigeek"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={"/assets/static/github.svg"}
							alt="GitHub"
							width="54"
							height="54"
						/>
					</a>
				</div>
				<div className={snsIcon}>
					<a
						id="linkedin"
						href="https://www.linkedin.com/in/shinyaigeek/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={"/assets/static/linkedin.svg"}
							alt="LinkedIn"
							width="54"
							height="54"
						/>
					</a>
				</div>
			</div>
			<div className={mail}>
				<a href="mailto:me@shinyaigeek.dev">
					Contact Me{" "}
					<g-emoji fallback-src="/assets/static/email.png" alias="email">
						📧
					</g-emoji>
				</a>
			</div>
		</div>
	);
};
