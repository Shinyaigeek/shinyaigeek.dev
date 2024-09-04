import { type FunctionComponent, useContext } from "react";
import { LanguageContext } from "../../../../context/language-context";

export const AboutMe: FunctionComponent = () => {
	const language = useContext(LanguageContext);

	switch (language) {
		case "ja": {
			return (
				<p>
					こんにちは、こんばんは、しにゃいと申します。
					<br />
					Web Developerとして活動しております。
					<br />
					<br />
					Webというプラットフォームの普遍性に惹かれていて、その可能性を広げていくための活動をしております。この活動を通して、Webの可能性を人々に伝えていきたいと思っています。
					<br />
					<br />
					「どこでもいつでも誰にでも」を標語として掲げ、Webの普遍性を最大限に引き出すために、クライアントマシンのスペックが低くてもアプリケーションが動くようにクライアントマシンのRuntime
					Costを下げたり、クライアントマシンの通信状況が悪くてもアプリケーションが動くようにI/O
					Costを下げたり、目の見えない人や認知障害の人はもちろん、料理や筋トレで手が不自由な人でもコンテンツにアクセスできるように、アクセシビリティを考慮したコードを書いたりしています。この意志を実現するために、Webフロントエンドだけでなく、CDN
					Edge Proxy、サーバーサイドなど、幅広くWeb開発に携わってきました。
					<br />
					<br />
					趣味はWebとプログラミングです。趣味で自作ブラウザを作ったり、parcel-bundlerの優れたスケーラビリティ（Transformer,
					Resolver, Pipeline, ...）とWeb開発へのカバレッジ（TypeScript, Vue,
					React, Scss, CoffeeScript
					...）に惚れ込み、parcel-bundlerにcontributeしています。
					<br />
					<br />
					現在、積極的に仕事を探しているわけではありませんが、Web開発職の副業に関するメッセージは大歓迎です!
				</p>
			);
		}
		case "en": {
			return (
				<p>
					Hi! I am Shinyaigeek(Shinobu Hayashi).
					<br />I am working as a Web Developer.
					<br />
					<br />I am attracted by the universality of the Web platform, and I am
					working to expand the possibilities of that. Through this work, I want
					to tell the possibilities of the web to people.
					<br />
					<br />
					Under the slogan of \"anywhere, anytime, anyone\", in order to
					maximize the universality of the Web, I am working on reducing the
					Runtime Cost on the client machine so that applications can run even
					if the client machine spec is low, and reducing I/O Cost so that
					applications can run even if the client machine is in the poor
					connection, and writing the code with accessibility in mind so that
					anyone can access the contents, not only the blind or who have
					cognitive impairment but also who does not have free hand because of
					cooking or muscle training. To accomplish this wish, I have worked on
					a wide range of web development, not only web frontend but also CDN,
					Edge Proxy, Server-side.
					<br />
					<br />
					My hobby is web and programming. I am make the handmade browser as a
					hobby, and I contribute parcel-bundler because I am in love with the
					parcel-bundler because parcel-bundler have the grate
					scalability(Transformer, Resolver, Pipeline, ...) and the great
					coverage of the web development(TypeScript, Vue, React, Scss,
					CoffeeScript...).
					<br />
					<br />I am not actively looking for a job at the moment, but the
					message about a side work for a web dev position is welcome!!
				</p>
			);
		}
	}
};
