// import { flagParser } from "./flagParser";
import { context } from "@actions/github";
import puppeteer from "puppeteer";
import fs from "fs";
import rimraf from "rimraf";
// import { upload } from "github-image-upload";
import path from "path";
import chromeLauncher from "chrome-launcher";
import request from "request";
import util from "util";

const ci = !!process.env.GITHUB_ACTION;

// https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
const options = ci
  ? { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
  : {};

const main = async () => {
    // const flags = flagParser();
    const branch = context?.payload?.pull_request?.head.ref || "test"
    const preview = `https://shinyaigeek-git-${branch}.shinyaigeek.now.sh`;


    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation({
        waitUntil: "networkidle2"
    });
    await page.goto("https://shinyaigeek.dev");

    await navigationPromise;

    const firstPaint = JSON.parse(
        await page.evaluate(() =>
            window.JSON.stringify(window.performance.getEntriesByName('first-paint'))
        )
    );

    const firstContentfulPaint = JSON.parse(
        await page.evaluate(() =>
            window.JSON.stringify(window.performance.getEntriesByName('first-contentful-paint'))
        )
    );



    console.log(`First paint: ${firstPaint[0].startTime} ms`);
    console.log(`First paint: ${firstContentfulPaint[0].startTime} ms`);

    await browser.close();


}

main()

