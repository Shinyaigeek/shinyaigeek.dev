import { Plugin } from '../plugin/basic';
import type { BasicRouter, GenerateHandler, OutputHandler } from './basic';

export class Router implements BasicRouter {
    private routing: Map<
        string,
        {
            generate: GenerateHandler;
            output: OutputHandler;
        }
    > = new Map();
    private onRoutedPlugins: Set<
        (path: string, generate?: GenerateHandler, output?: OutputHandler) => void
    >;
    private onGeneratedPlugins: Set<(path: string, content: string) => void>;
    private onOutputPlugins: Set<(path: string) => void>;

    on(path: string, handler: { generate: GenerateHandler; output: OutputHandler }) {
        this.routing.set(path, handler);
    }

    async out(path: string) {
        const handler = this.routing.get(path);

        if (handler) {
            const { generate, output } = handler;
            const content = await generate({ path });
            await output({ path, content });
        }
    }

    register(plugin: Plugin) {
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
