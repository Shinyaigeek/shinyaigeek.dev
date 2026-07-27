export {
	Router,
	type GenerateHandler,
	// Handlers receive and return this, so consumers need to be able to name it.
	type GenerateOutput,
	type OutputHandler,
} from "./router/router";
export type { Plugin } from "./plugin/basic";
