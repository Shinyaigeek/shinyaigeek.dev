import { PassThrough, Readable } from "node:stream";
import type { ReactElement } from "react";
// @ts-expect-error
import rsdws from "react-server-dom-webpack/server";
const { renderToPipeableStream } = rsdws;

export type ClientReferenceManifestEntry = {
	id: string;
	// chunks is a double indexed array of chunkId / chunkFilename pairs
	chunks: Array<string>;
	name: string;
};
type ClientManifest = Record<string, ClientReferenceManifestEntry>;

export const renderToStaticMarkup: (
	element: ReactElement,
	clientManifest: ClientManifest,
) => Promise<string> = async (element, clientManifest) => {
	const stream = Readable.toWeb(
		renderToPipeableStream(element, clientManifest).pipe(new PassThrough()),
	);
	let result = "";
	const decoder = new TextDecoder("utf-8");
	for await (const chunk of stream) {
		result += decoder.decode(chunk);
	}
	return result;
};
