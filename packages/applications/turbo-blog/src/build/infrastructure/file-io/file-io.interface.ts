export interface FileIOInfrastructureInterface {
	readDirectory: (path: string) => Promise<string[]>;
	readFile: (path: string) => Promise<string>;
}
