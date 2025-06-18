import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import imageToBase64 from "image-to-base64";
import React from "react";
import satori from "satori";
import { OGImageTemplate } from "./OGImageTemplate";

interface Args {
	title: string;
}

const OGImageHeight = 1080;
const OGImageWidth = 1920;

export const generateOGImageFromBlogPost = async ({
	title,
}: Args): Promise<Buffer> => {
	const logo = await imageToBase64(
		"https://shinyaigeek.dev/assets/static/icon_transparent.png",
	);

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
					data: await fs.readFile(
						"./src/build/handlers/ogimage/KosugiMaru-Regular.ttf",
					),
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
