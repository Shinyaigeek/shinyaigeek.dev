import { type FunctionComponent, useContext } from "react";
import { LanguageContext } from "../../../../context/language-context";
import { assertIsNever } from "../../../../../universal/assert-is-never";

export const AboutMe: FunctionComponent = () => {
	const language = useContext(LanguageContext);

	switch (language) {
		case "ja": {
			return (
				<p>
					"Shinobu Hayashi(Shinyaigeek)/しにゃい" と申します。日本で Software Engineer として活動しております。
					<br />
					ある新聞社で Web におけるコンテンツ配信における、サービスの信頼性や読み込み速度といった観点での最適化によるユーザー体験の向上に従事しています。また合わせてチーム内における各種アプリケーションインフラや開発のためのツーリングといった開発インフラといった複雑なドメインにおける、技術的な課題を解消する Complicated Subsystem Engineering 的な活動や他のチームにおける Web 開発で技術選定やアプリケーション設計、メンバーのトレーニングといった面でサポートを行う Enabling Engineering といった活動に注力しています。
					<br />
					技術ドメインとしてはハイパフォーマンスな BFF やフロントエンドを実現するためのキャッシュ戦略、アプリケーションを超えインフラなどまで踏まえたサービス設計や、フロントエンド面での複雑なツーリングをアプリケーションの要件やチームの文化に応じて設計、導入することを生業としています。
					<br />
					また OSS 活動も行っており、個人のプロジェクトだとECMAScript におけるモジュールの副作用を発見するツール (Treeche) の開発や自作ブラウザの作成を行っています。pnpm のメンバーでもあり、タスクランナー周りの開発を主に行っていました。
					<br />
					ソフトウェア開発にまつわるお仕事に関するメッセージは大歓迎です！
				</p>
			);
		}
		case "en": {
			return (
				<p>
					Hi! I am Shinyaigeek(Shinobu Hayashi). I am  a Software Engineer in Japan.
					<br />
					<br />I'm working to improve a delivering contents on Web in perspectives of application performance or application reliability and make User Experience better in a japanese traditional newsmedia company. Also, I'm focusing on both of complicated subsystem engineering and enabling engineering currently. The first, I work to solve technical issues on our service's complicated technical domain such as application's infra or application's developing tool, such as build-tool or linter. Last, I work to enhance the others team in my company with supporting web development of the other team as a technical adviser, a technical lead or a technical trainer.
					<br />In technical domain, I am good at designing a "service" architecture beyond an application itself and Cache strategy to accomplish high performance web application, and designing and introducing complicated frontend tool-chain according to an application's requirements or a team's culture.
					<br />
					Additionally, I contribute to OSS. In my private project, I created the tool, Treeche, which detects the side effects of ECMAScript module and created the browser. I am also a member of pnpm. I worked to develop pnpm's task runner mainly.
					<br />
					Messages about software development job is welcome!
				</p>
			);
		}
		default: {
			assertIsNever(language)
		}
	}
};
