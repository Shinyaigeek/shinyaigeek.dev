import { Storage } from "@google-cloud/storage";
import path from "path"
import dotenv from "dotenv"

dotenv.config();

const main = () => {
    ["layout.css", "home.css", "post.css", "profile.css", "profile.js"].forEach(tar => {
      uploadFile(tar)
    })
};

main();

async function uploadFile(target: string) {
  const storage = new Storage({
      projectId: "111690844586841957282",
      keyFilename: path.join(__dirname, `../${process.env.GCS_KEY_PATH}`)
  });

  await storage.bucket("blog_assets_shinyaigeek").upload(path.join(__dirname, "../dist/" + target), {
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });
}
