type p = string;
type html = string;
export type handler = (path: `/${p}`) => html;

export class Router {
  routing: Map<`/${p}`, handler> = new Map();
  constructor() {}

  on: (path: `/${p}`, handler: handler) => Router = (path, handler) => {
    this.routing.set(path, handler);
    return this;
  };

  out: (handler: (path: `/${p}`, html: html) => void) => void = (handler) => {
    for (let [route, routeHandler] of this.routing) {
      const html = routeHandler(route);
      handler(route, html);
    }
  }
}
