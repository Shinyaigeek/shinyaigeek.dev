export interface Entry {
	fields: {
		title: string;
		description: string;
		slug: string;
		publishedAt: string;
		tags: string[];
		content: string;
		hasEn: boolean;
	};
	sys: {
		updatedAt: string;
	};
}
