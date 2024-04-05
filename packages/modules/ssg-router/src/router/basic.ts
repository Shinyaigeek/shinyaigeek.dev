import type { Plugin } from "../plugin/basic";

export type GenerateHandlerArguments = {
	path: string;
};
export type GenerateHandler = (
	args: GenerateHandlerArguments,
) => Promise<string>;

export type OutputHandlerArguments = {
	path: string;
	content: string;
};
export type OutputHandler = (args: OutputHandlerArguments) => Promise<void>;

export type BasicRouter = {
	on: (
		path: string,
		arg: { generate: GenerateHandler; output: OutputHandler },
	) => void;
	onChildren: (generateChildren: () => Promise<string[]>) => void;
	out: (path: string) => Promise<void>;
	register: (plugin: Plugin) => void;
};
