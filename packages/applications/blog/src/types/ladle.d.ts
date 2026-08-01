// @ladle/react 5.1.1 publishes its build-time typings as .tsx sources sitting
// next to the generated .d.ts files, and TypeScript 7 resolves the .tsx first --
// so tsc ends up checking ladle's own app source, which does not compile against
// React 19's types. skipLibCheck cannot help: it only ever skips .d.ts.
//
// The stories only use the Story type, so blog's tsconfig maps "@ladle/react"
// here. Delete this file and the `paths` entry once ladle stops shipping the
// .tsx files, and the real types take over again.
import type { FC } from "react";

export interface Story<P = Record<string, never>> extends FC<P> {
	storyName?: string;
	args?: Partial<P>;
	argTypes?: Record<string, unknown>;
	parameters?: Record<string, unknown>;
}
