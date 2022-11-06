import React from "react";
import satori from "satori";
import { OGImageTemplate } from "./OGImageTemplate";
import { Resvg } from "@resvg/resvg-js";

interface Args {
  title: string;
}

const OGImageHeight = 1080;
const OGImageWidth = 1920;

export const generateOGImageFromBlogPost: (args: Args) => Promise<Buffer> =
  async function ({ title }) {
    const svgData = await satori(
      <OGImageTemplate
        title={title}
        width={OGImageWidth}
        height={OGImageHeight}
      />,
      {
        width: OGImageWidth,
        height: OGImageHeight,
        fonts: [],
      }
    );

    const resvg = new Resvg(svgData);

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return pngBuffer;
  };
