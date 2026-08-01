import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { OGImageTemplate } from "./OGImageTemplate";

interface Args {
	title: string;
}

const OGImageHeight = 1080;
const OGImageWidth = 1920;

/**
 * The same logo and the same font go into every one of these images, and there
 * are as many of them as there are routes -- so both are read once and held for
 * the rest of the process.
 *
 * The logo used to be fetched from https://shinyaigeek.dev on every single
 * image, which made a local build depend on the deployed site being up: one
 * round trip per image, and nothing to render at all while offline. It is the
 * asset we ship at src/assets/static/icon_transparent.png, so it is read from
 * there instead and the deployed copy is no longer in the loop.
 */
const readLogo = async () =>
	(await fs.readFile("./src/assets/static/icon_transparent.png")).toString(
		"base64",
	);

const readFont = () =>
	fs.readFile("./src/build/handlers/ogimage/KosugiMaru-Regular.ttf");

// Kicked off on first use rather than at import time: holding the promise means
// concurrent callers share the one read instead of racing to start their own.
let logoPromise: Promise<string> | undefined;
let fontPromise: Promise<Buffer> | undefined;

export const generateOGImageFromBlogPost = async ({
	title,
}: Args): Promise<Buffer> => {
	logoPromise ??= readLogo();
	fontPromise ??= readFont();

	const [logo, font] = await Promise.all([logoPromise, fontPromise]);

	const svgData = await satori(
		<OGImageTemplate
			title={title}
			width={OGImageWidth}
			height={OGImageHeight}
			logo={logo}
		/>,
		{
			width: OGImageWidth,
			height: OGImageHeight,
			fonts: [
				{
					name: "Roboto",
					data: font,
					weight: 800,
					style: "normal",
				},
			],
		},
	);

	const resvg = new Resvg(svgData);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
};
