type p = string;
type html = string;
export type handler = (path: `/${p}`) => html;

declare function on(
  path: `/${p}`,
  handler: handler,
  children: undefined
): Router;
declare function on(
  path: `/${p}`,
  handler: undefined,
  children: Router[]
): Router;

// todo asynchrous, parallel
export class Router {
  routing: Map<`/${p}`, handler> = new Map();
  constructor() {}

  on: typeof on = (path, handler, children) => {
    if (!!children) {
      for (let child of children) {
        for (let [childRoute, childRouteHandler] of child.routing) {
          this.routing.set(`${path}${childRoute}`, childRouteHandler);
        }
      }
    } else {
      if (handler) {
        this.routing.set(path, handler);
      }
    }
    return this;
  };

  out: (handler: (path: `/${p}`, html: html) => void) => void = (handler) => {
    for (let [route, routeHandler] of this.routing) {
      const html = routeHandler(route);
      handler(route, html);
    }
  };

  resolve: (path: `/${p}`) => html = (path) => {
    const handler = this.routing.get(path);
    if (!handler) {
      throw new Error(`${path} does not exist on routing`);
    }
    return handler(path);
  };
}
