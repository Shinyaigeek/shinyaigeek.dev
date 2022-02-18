import { i18n } from "@lingui/core";

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
  languages: Set<string> = new Set();
  defaultLanguage?: string;
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
    for (const lang of this.languages) {
      if (this.defaultLanguage === undefined) {
        throw new Error("router.registerDefaultLanguage should be called");
      }

      i18n.activate(lang);

      for (let [_route, routeHandler] of this.routing) {
        const route = `/${lang}${_route}` as `/${p}`;

        const html = routeHandler(route);
        handler(route, html);
      }
    }
  };

  resolve: (path: `/${p}`) => html = (path) => {
    const handler = this.routing.get(path);
    if (!handler) {
      throw new Error(`${path} does not exist on routing`);
    }
    return handler(path);
  };

  // TODO: lingui message is js
  registerLanguage: (language: string, message: any) => void = (
    language,
    message
  ) => {
    this.languages.add(language);
    i18n.load(language, message);
  };

  // TODO: lingui message is js
  registerDefaultLanguage: (language: string, message: any) => void = (
    language,
    message
  ) => {
    this.defaultLanguage = language;
    this.registerLanguage(language, message);
  };
}
