import fs from "node:fs/promises";
import type { FileIOInfrastructureInterface } from "./file-io.interface";

export class NodeFileIOInfrastructure implements FileIOInfrastructureInterface {
	public readDirectory(path: string) {
		return fs.readdir(path);
	}

	public readFile(path: string) {
		return fs.readFile(path, "utf-8");
	}
}
