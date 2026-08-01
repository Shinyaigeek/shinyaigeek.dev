/**
 * What the handlers need that is only knowable once `build:client` has run.
 * The router hands the same object to every generate and output handler.
 */
export type Context = {
	builtAssets: {
		css: string;
	};
};
