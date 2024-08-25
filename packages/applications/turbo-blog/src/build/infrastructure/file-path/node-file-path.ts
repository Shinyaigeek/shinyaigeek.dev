import path from "node:path";
import type { FilePathInfrastructureInterface } from "./file-path.interface";

export class NodeFilePathImplementation
	implements FilePathInfrastructureInterface
{
	public resolve(...args: string[]) {
		return path.resolve(...args);
	}
}
