import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import imageToBase64 from "image-to-base64";
import React from "react";
import satori from "satori";
import { getContentAbsolutePath } from "../contents-handler/get-content-path.js";
import { OGImageTemplate } from "./OGImageTemplate.js";

interface Args {
	title: string;
}

const OGImageHeight = 1080;
const OGImageWidth = 1920;

export const generateOGImageFromBlogPost: (args: Args) => Promise<Buffer> =
	async ({ title }) => {
		const logo = await imageToBase64(
			"https://shinyaigeek.dev/assets/static/shinyaigeek_icon.png",
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
							getContentAbsolutePath(
								"./src/generateOGImage/KosugiMaru-Regular.ttf",
							),
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
