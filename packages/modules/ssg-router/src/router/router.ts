import type { Plugin } from "../plugin/basic";
import type { BasicRouter, GenerateHandler, OutputHandler } from "./basic";

export class Router<RoutingContext> implements BasicRouter<RoutingContext> {
	private routing: Map<
		string,
		{
			generate: GenerateHandler<RoutingContext>;
			output: OutputHandler<RoutingContext>;
		}
	> = new Map();
	private onRoutedPlugins: Set<
		(path: string, context: RoutingContext) => void
	> = new Set();
	private onGeneratedPlugins: Set<(path: string, content: string) => void> =
		new Set();
	private onOutputPlugins: Set<(path: string) => void> = new Set();

	on(
		path: string,
		handler: {
			generate: GenerateHandler<RoutingContext>;
			output: OutputHandler<RoutingContext>;
		},
	) {
		this.routing.set(path, handler);
	}

	onChildren(generateChildren: () => Promise<string[]>) {
		this.on("/", {
			generate: async ({ path }) => {
				const children = await generateChildren();
				return JSON.stringify(children);
			},
			output: async ({ path, content }) => {
				console.log(`output: ${path}`);
			},
		});
	}

	async out(path: string) {
		const handler = this.routing.get(path);
		const context = {} as RoutingContext;

		for (const onRouted of this.onRoutedPlugins) {
			await onRouted(path, context);
		}

		if (handler) {
			const { generate, output } = handler;
			const content = await generate({ path, context: context });

			for (const onGenerated of this.onGeneratedPlugins) {
				await onGenerated(path, content);
			}

			await output({ path, content, context: context });

			for (const onOutput of this.onOutputPlugins) {
				await onOutput(path);
			}
		}
	}

	register(plugin: Plugin<RoutingContext>) {
		if (plugin.onRouted) {
			this.onRoutedPlugins.add(plugin.onRouted);
		}
		if (plugin.onGenerated) {
			this.onGeneratedPlugins.add(plugin.onGenerated);
		}
		if (plugin.onOutput) {
			this.onOutputPlugins.add(plugin.onOutput);
		}
	}
}
