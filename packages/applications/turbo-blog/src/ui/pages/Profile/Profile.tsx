import { Divider } from "../components/Divider/Divider";
import { Layout } from "../components/Layout/Layout";
import { Shinyaigeek } from "../components/Shinyaigeek/Shinyaigeek";
import profile from "./Profile.module.css";
import { Card, CardShowcase } from "./components/Card/Card";
import { GitHubCalender } from "./components/GitHubCalender/GitHubCalender";
import { JobItem } from "./components/JobItem/JobItem";
import { BaseProfile } from "./components/ShinyaigeekCoreProfile/ShinyaigeekCoreProfile";

export const Profile = Layout(() => {
	return (
		<div className={profile.profile}>
			<div>
				<Shinyaigeek />

				<BaseProfile />

				<Divider />

				<GitHubCalender />

				<Divider />

				<div className="description">
					<div className={profile.title}>About Me</div>
					<p className="content" />
				</div>

				<Divider />

				<div className="history--study element">
					<ul className={profile.lists} />
				</div>

				<Divider />

				<div className="history--job element" />

				<Divider />

				<div className="interests">
					<div className={profile.title}>Specialities</div>
					<p className="content">
						<CardShowcase>
							{specialities.map((speciality) => (
								<Card
									title={speciality.title}
									img={speciality.img ?? "/assets/static/placeholder.png"}
								/>
							))}
						</CardShowcase>
					</p>
				</div>
			</div>
		</div>
	);
});

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
