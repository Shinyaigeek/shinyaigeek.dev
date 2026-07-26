import type { DOMAttributes } from "react";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: unknown }>;

// GitHub's <g-emoji> custom element, used to render emoji consistently across
// platforms. React 19 moved JSX.IntrinsicElements under the "react" module, so
// the augmentation has to be declared there rather than on the global JSX
// namespace.
declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"g-emoji": CustomElement<{
				"fallback-src": string;
				alias: string;
			}>;
		}
	}
}
