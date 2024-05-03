import type { Plugin } from "../plugin/basic";

export type GenerateHandlerArguments<RoutingContext> = {
	path: string;
	context: RoutingContext;
};
export type GenerateHandler<RoutingContext> = (
	args: GenerateHandlerArguments<RoutingContext>,
) => Promise<string>;

export type OutputHandlerArguments<RoutingContext> = {
	path: string;
	content: string;
	context: RoutingContext;
};
export type OutputHandler<RoutingContext> = (
	args: OutputHandlerArguments<RoutingContext>,
) => Promise<void>;

export type BasicRouter<RoutingContext> = {
	on: (
		path: string,
		arg: {
			generate: GenerateHandler<RoutingContext>;
			output: OutputHandler<RoutingContext>;
		},
	) => void;
	onChildren: (generateChildren: () => Promise<string[]>) => void;
	out: (path: string) => Promise<void>;
	register: (plugin: Plugin<RoutingContext>) => void;
};
