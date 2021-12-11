import path from "path";
import { Storage } from "@google-cloud/storage";

import dotenv from "dotenv";
import asserts from "assert";
import { readdirSync } from "fs";

dotenv.config();

const { GCS_CREDENTIAL_JSON, BUCKET } = process.env;

asserts(GCS_CREDENTIAL_JSON && BUCKET);

const uploadAssetsToGCS = async () => {
  const gcsClient = new Storage({
    keyFilename: path.join(__dirname, "../meta/" + GCS_CREDENTIAL_JSON),
  });

  const targetFiles = readdirSync(path.join(__dirname, "../dist"));

  Promise.all(
    targetFiles.map((file) => {
      gcsClient.bucket(BUCKET).upload(path.join(__dirname, "../dist/" + file), {
        destination: `static/${file}`,
        metadata: {
          cacheControl: "public, max-age=604800, immutable",
        },
      });
    })
  );
};

uploadAssetsToGCS();
