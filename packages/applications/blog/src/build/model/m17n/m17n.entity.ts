import type { Content } from "../content/content.entity";

export class M17NContents<T extends Content> {
	constructor(
		public ja?: T,
		public en?: T,
	) {}
}
