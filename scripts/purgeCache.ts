import dotenv from "dotenv";
import assert from "assert";
import fetch from "node-fetch";

const baseUrl = "https://api.cloudflare.com/client/v4/";

export const purgeCache = () => {
  dotenv.config();
  const {
    CLOUDFLARE_PURGE_HTML_TOKEN: token,
    CLOUDFLARE_ID: id,
    CLOUDFLARE_EMAIL: email,
  } = process.env;
  assert(token && id && email, "CloudFlare Token is undefined");
  console.log(token);
  const target = `${baseUrl}zones/${id}/purge_cache`;
  return fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Email": email,
      "X-Auth-Key": token,
    },
    body: JSON.stringify({
      files: [
        "https://shinyaigeek.dev/**/*.js",
        "https://shinyaigeek.dev/**/*.css",
        "https://shinyaigeek.dev/**/*.html",
      ],
    }),
  })
    .then(async (res) => {
      console.log(await res.json());
    })
    .catch((e) => {
      throw new Error(e);
    });
};

purgeCache();
