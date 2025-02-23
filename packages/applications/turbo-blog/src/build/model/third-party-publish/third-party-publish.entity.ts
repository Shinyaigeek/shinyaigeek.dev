export class ThirdPartyPublishContent {
	constructor(
		public readonly mediaType: "blog" | "speakerdeck",
		public readonly slug: URL,
		public readonly title: string,
		public readonly description: string,
		public readonly ogp: URL,
		public readonly publishedAt: Date,
		public readonly media: "speakerdeck" | "blog",
	) {}
}
