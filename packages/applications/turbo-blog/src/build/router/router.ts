import { i18n } from "@lingui/core";

type p = string;
type html = string;
export type handler = (path: `/${p}`) => Promise<html>;

declare function on(
	path: `/${p}`,
	handler: handler,
	children: undefined,
): Router;
declare function on(
	path: `/${p}`,
	handler: undefined,
	children: Router[],
): Router;

// todo asynchrous, parallel
export class Router {
	routing: Map<`/${p}`, handler> = new Map();
	languages: Set<string> = new Set();
	defaultLanguage?: string;

	on: typeof on = (path, handler, children) => {
		if (children) {
			for (const child of children) {
				for (const [childRoute, childRouteHandler] of child.routing) {
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

	out: (
		handler: (path: `/${p}`, html: html) => Promise<void>,
	) => Promise<void> = async (handler) => {
		await Promise.all(
			Array.from(this.languages).flatMap((language) => {
				if (this.defaultLanguage === undefined) {
					throw new Error("router.registerDefaultLanguage should be called");
				}

				i18n.activate(language);

				return Array.from(this.routing.entries()).map(
					async ([_route, routeHandler]) => {
						const route = `/${language}${_route}` as `/${p}`;

						const html = await routeHandler(route);
						handler(route, html);
					},
				);
			}),
		);
	};

	resolve: (path: `/${p}`) => Promise<html> = (path) => {
		const handler = this.routing.get(path);
		if (!handler) {
			throw new Error(`${path} does not exist on routing`);
		}
		return handler(path);
	};

	// TODO: lingui message is js
	registerLanguage: (language: string, message: any) => void = (
		language,
		message,
	) => {
		this.languages.add(language);
		i18n.load(language, message);
	};

	// TODO: lingui message is js
	registerDefaultLanguage: (language: string, message: any) => void = (
		language,
		message,
	) => {
		this.defaultLanguage = language;
		this.registerLanguage(language, message);
	};
}
