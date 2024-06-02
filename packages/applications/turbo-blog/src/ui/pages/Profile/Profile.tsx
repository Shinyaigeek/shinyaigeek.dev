import type { FunctionComponent } from "react";
import { Divider } from "../../components/Divider/Divider";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { lists, profile, title } from "./Profile.module.css";
import { Card } from "./components/Card/Card";
import { GitHubCalender } from "./components/GitHubCalender/GitHubCalender";
import { ShinyaigeekCoreProfile } from "./components/ShinyaigeekCoreProfile/ShinyaigeekCoreProfile";

export const Profile: FunctionComponent = () => (
	<div className={profile}>
		<div>
			<ShinyaigeekPortrait />

			<ShinyaigeekCoreProfile />

			<Divider />

			<GitHubCalender />

			<Divider />

			<div className="description">
				<div className={title}>About Me</div>
				<p className="content" />
			</div>

			<Divider />

			<div className="history--study element">
				<ul className={lists} />
			</div>

			<Divider />

			<div className="history--job element" />

			<Divider />

			<div className="interests">
				<div className={title}>Specialities</div>
				<p className="content">
					<ul>
						{specialities.map((speciality) => (
							<Card
								title={speciality.title}
								img={speciality.img ?? "/assets/static/placeholder.png"}
							/>
						))}
					</ul>
				</p>
			</div>
		</div>
	</div>
);

interface Speciality {
	title: string;
	img?: string;
}

const specialities: Speciality[] = [
	{
		title: "JavaScript",
		img: "/assets/static/javascript.png",
	},

	{
		title: "TypeScript",
		img: "/assets/static/typescript.png",
	},
	{
		title: "React",
		img: "/assets/static/react.png",
	},
	{
		title: "Rust",
		img: "/assets/static/rust.png",
	},
	{
		title: "Fastly",
		img: "/assets/static/fastly.png",
	},
	{
		title: "CloudFlare",
		img: "/assets/static/cloudflare.png",
	},
	{
		title: "Web Performance",
	},
	{
		title: "Browser",
	},
	{
		title: "Network",
	},
	{
		title: "Web Frontend Tooling",
	},
];
