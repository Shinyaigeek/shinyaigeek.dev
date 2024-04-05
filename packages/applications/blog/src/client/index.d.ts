import type { DOMAttributes } from "react";

declare module "*.scss" {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}

// biome-ignore lint: reason
type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"g-emoji": CustomElement<{
				"fallback-src": string;
				alias: string;
			}>;
		}
	}
}
