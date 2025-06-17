import type { FunctionComponent } from "react";
import { Language } from "../../../build/model/language/language.entity";
import type { WorkExperience } from "../../../build/model/work-experience/work-experience.entity";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { AboutMe } from "../../components/about-me/about-me";
import { Divider } from "../../components/divider/divider";
import { ShinyaigeekCoreProfile } from "../../components/shinyaigeek-core-profile/shinyaigeek-core-profile";
import { lists, profile, title } from "./Profile.module.css";
import { Card } from "./components/Card/Card";

interface Props {
	language: Language;
	workExperiences: WorkExperience[];
}

export const Profile: FunctionComponent<Props> = ({
	language,
	workExperiences,
}) => {
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

	const workExperienceTitle =
		language === Language.ja ? "職歴" : "Working Experience";

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
					<div className={title}>{workExperienceTitle}</div>
					<ul className={lists}>
						{workExperiences.map((experience) => (
							<li key={experience.slug}>
								<h3>{experience.metadata.company}</h3>
								<p>
									<time dateTime={experience.metadata.startDate}>
										{experience.metadata.startDate}
									</time>{" "}
									~{" "}
									{experience.metadata.endDate ? (
										<time dateTime={experience.metadata.endDate}>
											{experience.metadata.endDate}
										</time>
									) : (
										"Present"
									)}
								</p>
								{experience.metadata.role && (
									<p>Role: {experience.metadata.role}</p>
								)}
								{experience.metadata.position && (
									<p>Position: {experience.metadata.position}</p>
								)}
								{experience.metadata.technologies && (
									<p>
										Technologies: #{experience.metadata.technologies.join(" #")}
									</p>
								)}
								<details>
									<summary>detail</summary>
									{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
									<div dangerouslySetInnerHTML={{ __html: experience.body }} />
								</details>
								{experience.metadata.entries && (
									<ul>
										{experience.metadata.entries.map((entry) => (
											<li key={entry.url}>
												<a href={entry.url}>{entry.title}</a>
											</li>
										))}
									</ul>
								)}
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
			</div>
		</div>
	);
};
