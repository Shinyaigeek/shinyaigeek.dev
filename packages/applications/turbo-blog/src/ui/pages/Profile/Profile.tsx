import type { FunctionComponent } from "react";
import { Language } from "../../../build/model/language/language.entity";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { AboutMe } from "../../components/about-me/about-me";
import { Divider } from "../../components/divider/divider";
import { ShinyaigeekCoreProfile } from "../../components/shinyaigeek-core-profile/shinyaigeek-core-profile";
import { lists, profile, title } from "./Profile.module.css";
import { Card } from "./components/Card/Card";

interface Props {
	language: Language;
}

export const Profile: FunctionComponent<Props> = ({ language }) => {
	const educationContent =
		language === Language.ja
			? {
					title: "学歴",
					items: [
						"2018: 西大和学園高等学校卒業",
						"2018: 東京大学入学",
						"2019: 東京大学工学部システム創成学科内定",
						"2020: 東京大学工学部システム創成学科進学",
						"2022: 東京大学工学部システム創成学科卒業",
					],
				}
			: {
					title: "Education",
					items: [
						"2018: Graduated from Nishiyamato highschool",
						"2018: Enter University of Tokyo",
						"2019: decide informally to major in Factory of Engineering in University of Tokyo",
						"2020: Major in Factory of Engineering in University of Tokyo",
						"2022: Graduated from University of Tokyo",
					],
				};

	const workExperienceContent =
		language === Language.ja
			? {
					title: "職歴",
					items: [
						{
							company: "株式会社日本経済新聞社",
							startDate: "2019/04",
							endDate: "2025/07",
							position: "Webエンジニア",
							description:
								"フロントエンドエンジニアとして, Web Frontend文脈でのパフォーマンス改善, インテラクティブなアプリケーション開発に従事する.",
						},
						{
							company: "Recruit",
							startDate: "2020/10",
							endDate: "2020/11",
							position: "Webエンジニア",
							description:
								"フロントエンドのUI改善, Web 標準動向の調査を行なっていました.",
						},
						{
							company: "Cybozu",
							startDate: "2020/09",
							endDate: "2020/09",
							position: "Internship Student",
							description:
								"学生インターンとして, チームを組みkintoneででの協働をより補強する拡張機能の開発を行う.",
						},
						{
							company: "Wantedly",
							startDate: "2020/08",
							endDate: "2020/09",
							position: "Webエンジニア",
							description: "Wentedly Webアプリの新機能開発.",
						},
						{
							company: "VOYAGE GROUP",
							startDate: "2020/08",
							endDate: "2020/08",
							position: "Treasure Internship Student",
							description:
								"TreasureでWeb Application開発のいろはを学び, その後チームを組んでバックエンドはfirebase, go, フロントエンドはPreact, bootstrapでブログ投稿プラットフォームの開発を行っていました.",
						},
						{
							company: "MOSHIMOS",
							startDate: "2018/10",
							endDate: "2018/12",
							position: "Webエンジニア",
							description: "Webエンジニアとしてアプリケーション開発に従事する",
						},
					],
				}
			: {
					title: "Working Experience",
					items: [
						{
							company: "Nikkei, Inc.",
							startDate: "2019/04",
							endDate: "2025/07",
							position: "Web Engineer",
							description:
								"I contributed to Web frontend performance tuning, and development interactive SPA.",
						},
						{
							company: "Recruit",
							startDate: "2020/10",
							endDate: "2020/11",
							position: "Web Engineer",
							description: "I improve SPA's UI and investigate Web standard",
						},
						{
							company: "Cybozu",
							startDate: "2020/09",
							endDate: "2020/09",
							position: "Internship Student",
							description:
								"I made the kintone's extension to allow kintone users to collaborate more with the other internship students.",
						},
						{
							company: "Wantedly",
							startDate: "2020/08",
							endDate: "2020/09",
							position: "Web Engineer",
							description: "I make Wantedly web application's new feature",
						},
						{
							company: "VOYAGE GROUP",
							startDate: "2020/08",
							endDate: "2020/08",
							position: "Treasure Internship Student",
							description:
								"I make media application with the other internship team.",
						},
						{
							company: "MOSHIMOS",
							startDate: "2018/10",
							endDate: "2018/12",
							position: "Web Engineer",
							description: "I made web application from backend to frontend.",
						},
					],
				};

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

				<div className="history--job element">
					<div className={title}>{workExperienceContent.title}</div>
					<ul className={lists}>
						{workExperienceContent.items.map((item) => (
							<li key={item.company}>
								<h3>{item.company}</h3>
								<p>
									<time dateTime={item.startDate}>{item.startDate}</time> ~{" "}
									{item.endDate ? (
										<time dateTime={item.endDate}>{item.endDate}</time>
									) : (
										"Present"
									)}
								</p>
								<p>Position: {item.position}</p>
								<p>{item.description}</p>
							</li>
						))}
					</ul>
				</div>

				<Divider />

				<div className="history--study element">
					<div className={title}>{educationContent.title}</div>
					<ul className={lists}>
						{educationContent.items.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>

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
