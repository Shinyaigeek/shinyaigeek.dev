import type { FunctionComponent } from "react";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { Divider } from "../../components/divider/divider";
import { lists, profile, title } from "./Profile.module.css";
import { Card } from "./components/Card/Card";
import { ShinyaigeekCoreProfile } from "./components/ShinyaigeekCoreProfile/ShinyaigeekCoreProfile";
import { AboutMe } from "./components/about-me/about-me";

export const Profile: FunctionComponent = () => {
	return (
		<div className={profile}>
			<div>
				<ShinyaigeekPortrait />

				<ShinyaigeekCoreProfile />

				<Divider />

				<div className="description">
					<div className={title}>About Me</div>
					<AboutMe />
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
};

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
