import dotenv from "dotenv";
import assert from "assert";
import fetch from "node-fetch";
import path from "path";

const baseUrl = "https://api.cloudflare.com/client/v4/";
//6386a36a9ac3e8c8494e8a4d43fd4f79b0956
//5cbceaea7b728562c7efd0a00cec0d25

const domains = [
  "https://shinyaigeek.dev",
  "https://www.shinyaigeek.dev",
  "https://en.shinyaigeek.dev",
  "https://ja.shinyaigeek.dev",
];

async function shouldPurge(filename: string) {
  const remoteSource = await fetch(`https://shinyaigeek.dev${filename}`);
  const localSourcePath = (() => {
    if (filename.endsWith(".html")) {
      return path.resolve(__dirname, `../../public/ja${filename}`);
    }
    if (filename === "sitemap.xml") {
      return path.resolve(__dirname, `../../public${filename}`);
    }
    if (filename === "rss.xml") {
      return path.resolve(__dirname, `../../public/ja${filename}`);
    }

    return path.resolve(__dirname, `../../public${filename}`);
  })();
}

function getContentsShouldPurged() {
  const shouldPurgeContents = [];
}

export const purgeCache = () => {
  dotenv.config();
  const {
    CLOUDFLARE_PURGE_HTML_TOKEN: token,
    CLOUDFLARE_ID: id,
    CLOUDFLARE_EMAIL: email,
  } = process.env;
  assert(token && id && email, "CloudFlare Token is undefined");
  const target = `${baseUrl}zones/${id}/purge_cache`;
  return fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Email": email,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      files: [
        "https://static.shinyaigeek.dev/**/*.js",
        "https://static.shinyaigeek.dev/**/*.css",
        "https://shinyaigeek.dev/**/*.html",
      ],
    }),
  })
    .then(async (res) => {
      console.log(res);
      console.log(await res.json());
    })
    .catch((e) => {
      throw new Error(e);
    });
};

purgeCache();
