import fs from "fs";
import path from "path";
import cp from "child_process";
import dotenv from "dotenv";

dotenv.config();

const getContenthash = () => {
  const output = process.env.STATIC_FILE_OUTPUT || "dist";
  const dirs = fs.readdirSync(path.join(__dirname, "../../" + output));
  const outputExt2contenthash = new Map<string, string>();
  for (let file of dirs) {
    if (file.endsWith(".js")) {
      outputExt2contenthash.set("js", file.split(".")[1]);
    } else if (file.endsWith(".css")) {
      outputExt2contenthash.set("css", file.split(".")[1]);
    }
  }

  return outputExt2contenthash;
};

const outputContenthash = getContenthash();

if (!outputContenthash.has("js") || !outputContenthash.has("css")) {
  throw new Error(
    "There is no [contenthash].js or [contenthash].css in /" +
      process.env.STATIC_FILE_OUTPUT
  );
}

const js = outputContenthash.get("js");
const css = outputContenthash.get("css");

// cp.exec(`CONTENTHASH_JS=${js} CONTENTHASH_CSS=${css} yarn build:server`)
cp.exec(`CONTENTHASH_JS=${js} CONTENTHASH_CSS=${css} yarn _build:ssg`);
