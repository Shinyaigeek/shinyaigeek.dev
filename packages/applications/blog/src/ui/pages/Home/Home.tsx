import type { Undefinable } from "option-t/esm/Undefinable";
import type { FunctionComponent } from "react";
import type { OSSProject } from "../../../build/model/oss/oss.entity";
import type { WorkExperience } from "../../../build/model/work-experience/work-experience.entity";
import { Item } from "../../components/Item/Item";
import { AlterEgo } from "../../components/alter-ego/alter-ego";
import { ExperienceTimeline } from "../../components/experience-timeline/experience-timeline";
import { HomeHero } from "../../components/home-hero/home-hero";
import { OSSHighlights } from "../../components/oss-highlights/oss-highlights";
import { Section } from "../../components/section/section";
import { blogList } from "./Home.module.css";

interface Props {
	language: "ja" | "en";
	items: {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
		ogp?: Undefinable<string>;
		media?: "speakerdeck" | "blog";
	}[];
	workExperiences?: WorkExperience[];
	ossProjects?: OSSProject[];
}

const EXPERIENCE_COUNT = 4;
const OSS_COUNT = 6;

const COPY = {
	ja: {
		experienceEyebrow: "Experience",
		experienceTitle: "職歴",
		experienceDescription:
			"Web フロントエンドからプラットフォーム / SRE 領域まで、プロダクトの信頼性とデリバリー速度に効く仕事を中心にやってきました。",
		experienceAction: "すべての職歴",
		writingEyebrow: "Writing",
		writingTitle: "書いたもの・話したもの",
		writingDescription:
			"ブログ記事と外部媒体での寄稿・登壇資料をまとめています。",
		ossEyebrow: "Open Source",
		ossTitle: "OSS",
		ossDescription: "作っているもの、継続的に貢献しているもの。",
		ossAction: "すべての OSS",
	},
	en: {
		experienceEyebrow: "Experience",
		experienceTitle: "Where I've worked",
		experienceDescription:
			"From web frontend to platform and reliability engineering — mostly work that moves the needle on how fast and how safely a product ships.",
		experienceAction: "Full history",
		writingEyebrow: "Writing",
		writingTitle: "Articles & talks",
		writingDescription:
			"Posts from this blog alongside external articles and conference decks.",
		ossEyebrow: "Open Source",
		ossTitle: "Open source work",
		ossDescription: "Projects I maintain and the ones I keep contributing to.",
		ossAction: "All projects",
	},
} as const;

export const Home: FunctionComponent<Props> = ({
	language,
	items,
	workExperiences = [],
	ossProjects = [],
}) => {
	const copy = COPY[language];

	return (
		<div>
			<HomeHero language={language} />

			{workExperiences.length > 0 && (
				<Section
					eyebrow={copy.experienceEyebrow}
					title={copy.experienceTitle}
					description={copy.experienceDescription}
					action={{ href: "/profile/", label: copy.experienceAction }}
				>
					<ExperienceTimeline
						language={language}
						workExperiences={workExperiences.slice(0, EXPERIENCE_COUNT)}
						showEntries={false}
					/>
				</Section>
			)}

			{ossProjects.length > 0 && (
				<Section
					eyebrow={copy.ossEyebrow}
					title={copy.ossTitle}
					description={copy.ossDescription}
					action={{ href: "/profile/", label: copy.ossAction }}
				>
					<OSSHighlights
						language={language}
						ossProjects={ossProjects.slice(0, OSS_COUNT)}
					/>
				</Section>
			)}

			{/* The full archive lives here, so it comes after the sections a
			    first-time visitor is most likely to be scanning for. */}
			<Section
				eyebrow={copy.writingEyebrow}
				title={copy.writingTitle}
				description={copy.writingDescription}
			>
				<div className={blogList}>
					{items.map((item) => (
						<Item
							key={item.path}
							title={item.title}
							description={item.description}
							publishedAt={item.publishedAt}
							path={item.path}
							ogp={item.ogp}
							media={item.media}
						/>
					))}
				</div>
			</Section>

			<AlterEgo language={language} />
		</div>
	);
};
