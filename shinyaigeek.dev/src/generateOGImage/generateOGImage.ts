import path from "path";
import { getBlogPosts } from "../build/util/getBlogPosts";
import { generateOGImageFromBlogPost } from "./generateOGImageFromBlogPost";
import fs from "fs/promises";
import { Entry } from "../build/util/getBlogPost";

const generateOGImage: () => Promise<void> = async function () {
  await fs.mkdir(path.join(__dirname, "../../../public/assets/ogimage/ja"), {
    recursive: true,
  });
  await fs.mkdir(path.join(__dirname, "../../../public/assets/ogimage/en"), {
    recursive: true,
  });

  const blogPosts = (["ja", "en"] as const)
    .map((language) =>
      getBlogPosts(
        path.join(__dirname, "../articles/public/") as `${string}/`,
        language
      ).map((blogPost) => ({
        ...blogPost,
        language,
      }))
    )
    .flat() as (Entry & { language: string })[];

  await Promise.all(
    blogPosts.map(async (blogPost) => {
      const pngData = await generateOGImageFromBlogPost({
        title: blogPost.fields.title,
      });

      fs.writeFile(
        path.join(
          __dirname,
          `../../../public/assets/ogimage/${
            blogPost.language
          }/${blogPost.fields.slug.slice(0, -1)}.png`
        ),
        pngData
      );
    })
  );
};

generateOGImage();
