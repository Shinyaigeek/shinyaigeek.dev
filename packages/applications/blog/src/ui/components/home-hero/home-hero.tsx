import type { FunctionComponent } from "react";
import {
	actions,
	copy,
	forDark,
	forLight,
	glitch,
	greeting,
	handle,
	hero,
	name,
	primaryAction,
	role,
	roleSeparator,
	secondaryAction,
	skill,
	skills,
	social,
	socialInvertOnDark,
	socials,
	tagline,
} from "./home-hero.module.css";

interface Props {
	language: "ja" | "en";
}

const SKILLS = ["TypeScript", "React", "Node.js", "Rust", "HTTP", "GCP"];

const COPY = {
	ja: {
		greeting: "Hi 👋 I'm",
		tagline:
			"Web のパフォーマンスと信頼性を軸に、プラットフォーム側から開発者とユーザーの体験を底上げすることを仕事にしています。",
		// CTA labels stay English in both locales — they match the "Contact Me"
		// already used on the profile card, and the Japanese renderings read
		// clunky next to an English hero.
		profile: "View Profile",
		contact: "Contact Me",
	},
	en: {
		greeting: "Hi 👋 I'm",
		tagline:
			"I work on the platform side of the web — performance, reliability, and the developer experience that keeps both of them honest.",
		profile: "View Profile",
		contact: "Contact Me",
	},
} as const;

export const HomeHero: FunctionComponent<Props> = ({ language }) => {
	const copyText = COPY[language];

	return (
		<div className={hero}>
			<div className={copy}>
				<p className={greeting}>{copyText.greeting}</p>
				<h1 className={name}>
					Shinobu Hayashi
					<span className={handle}>a.k.a. Shinyaigeek</span>
				</h1>

				<p className={role}>
					<span data-text="Software Engineer" className={glitch}>
						Software Engineer
					</span>
					<span className={roleSeparator}>/</span>
					<span data-text="Reliable Web Enthusiast" className={glitch}>
						Reliable Web Enthusiast
					</span>
					<span aria-hidden="true">🔥</span>
				</p>

				<p className={tagline}>{copyText.tagline}</p>

				<ul className={skills}>
					{SKILLS.map((item) => (
						<li key={item} className={skill}>
							{item}
						</li>
					))}
				</ul>

				<div className={actions}>
					<a className={primaryAction} href="/profile/">
						{copyText.profile}
					</a>
					<a className={secondaryAction} href="mailto:me@shinyaigeek.dev">
						{copyText.contact}
					</a>
					<span className={socials}>
						<a
							className={`${social} ${forLight}`}
							href="https://x.com/Shinyaigeek"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="X (Twitter)"
						>
							<img
								src="/assets/static/x-logo-black.png"
								alt=""
								width="20"
								height="20"
							/>
						</a>
						<a
							className={`${social} ${forDark}`}
							href="https://x.com/Shinyaigeek"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="X (Twitter)"
						>
							<img
								src="/assets/static/x-logo-white.png"
								alt=""
								width="20"
								height="20"
							/>
						</a>
						<a
							className={`${social} ${socialInvertOnDark}`}
							href="https://github.com/Shinyaigeek"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<img
								src="/assets/static/github.svg"
								alt=""
								width="20"
								height="20"
							/>
						</a>
						<a
							className={social}
							href="https://www.linkedin.com/in/shinyaigeek/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
						>
							<img
								src="/assets/static/linkedin.png"
								alt=""
								width="20"
								height="20"
							/>
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};
