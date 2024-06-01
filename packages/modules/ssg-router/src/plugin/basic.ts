export type Plugin<RoutingContext> = {
	onRouted?: (path: string, context: RoutingContext) => Promise<void>;
	onGenerated?: (
		path: string,
		content: string,
		context: RoutingContext,
	) => Promise<void>;
	onOutput?: (path: string, context: RoutingContext) => Promise<void>;
};
