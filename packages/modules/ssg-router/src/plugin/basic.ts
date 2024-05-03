export type Plugin<RoutingContext> = {
	onRouted: (path: string, context: RoutingContext) => Promise<void>;
	onGenerated: (path: string, content: string) => Promise<void>;
	onOutput: (path: string) => Promise<void>;
};
