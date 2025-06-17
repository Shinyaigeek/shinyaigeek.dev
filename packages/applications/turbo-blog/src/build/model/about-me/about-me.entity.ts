export interface AboutMeMetadata {
	name: string;
	location: string;
	occupation: string;
}

export interface AboutMe {
	metadata: AboutMeMetadata;
	body: string;
}
