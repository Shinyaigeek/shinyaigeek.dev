import path from "path";
import { getBlogPosts } from "../build/util/getBlogPosts";
import { generateOGImageFromBlogPost } from "./generateOGImageFromBlogPost";
import fs from "fs/promises";

const generateOGImage: () => Promise<void> = async function () {
  const blogPosts = (["ja", "en"] as const)
    .map((language) =>
      getBlogPosts(
        path.join(__dirname, "../articles/public/") as `${string}/`,
        language
      )
    )
    .flat();

  await Promise.all(
    blogPosts.map(async (blogPost) => {
      const pngData = await generateOGImageFromBlogPost({
        title: blogPost.fields.title,
      });

      fs.writeFile(
        path.join(
          __dirname,
          `../../../public/assets/ogimage/${blogPost.fields.slug.slice(0, -1)}.png`
        ),
        pngData
      );
    })
  );
};

generateOGImage();
