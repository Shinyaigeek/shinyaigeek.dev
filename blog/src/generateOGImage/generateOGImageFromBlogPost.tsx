import React from "react";
import satori from "satori";
import { OGImageTemplate } from "./OGImageTemplate";
import { Resvg } from "@resvg/resvg-js";
import imageToBase64 from "image-to-base64";
import fs from "fs/promises";
import path from "path";

interface Args {
  title: string;
}

const OGImageHeight = 1080;
const OGImageWidth = 1920;

export const generateOGImageFromBlogPost: (args: Args) => Promise<Buffer> =
  async function ({ title }) {
    const logo = await imageToBase64(
      "https://shinyaigeek.dev/assets/static/shinyaigeek_icon.png"
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
            data: await fs.readFile(path.join(__dirname, "./KosugiMaru-Regular.ttf")),
            weight: 800,
            style: "normal",
          },
        ],
      }
    );

    const resvg = new Resvg(svgData);

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return pngBuffer;
  };
