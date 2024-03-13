import type { BasicRouter, Handler } from "./basic";

export class Router implements BasicRouter {
    private routing: Map<string, Handler> = new Map();
    
    on(path: string, handler: Handler) {
        this.routing.set(path, handler);
    }

    async out(path: string) {
        const handler = this.routing.get(path);
        if (handler) {
            await handler({ path });
        }
    }
    
}
