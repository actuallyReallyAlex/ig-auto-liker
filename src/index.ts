import { ensureDir, readJSON, writeJSON } from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";
import { maximums } from "./constants";
import { likePosts, login } from "./steps";
import { Change, Settings } from "./types";

const main = async () => {
  let browser;
  let page;
  const settings: Settings = await readJSON(
    path.resolve(__dirname, "../settings.json")
  );
  // * ensure output dir exists
  const outputDir = path.resolve(__dirname, "../", settings.outputDir);
  await ensureDir(outputDir);

  const timestamp = new Date().getTime();
  let outputPath = path.resolve(outputDir, `./${timestamp}`);

  try {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    const counts = {
      follows: 0,
      likes: 0,
    };

    await login(settings, page);

    const changes: Change[] = [];

    for (let i = 0; i < settings.accounts.length; i++) {
      const account = settings.accounts[i];
      if (counts.likes >= maximums.likes.day) {
        break;
      }

      await likePosts(page, changes, account);
      counts.likes += 1;
    }

    await browser.close();
    outputPath += "-success.json";
    const output = { changes };
    await writeJSON(outputPath, output, { spaces: 2 });
    console.log(output);
  } catch (error) {
    browser?.close();
    page?.screenshot({ path: "error.png", type: "png" });
    console.error(error);
    outputPath += "-error.json";
    await writeJSON(outputPath, error, { spaces: 2 });
    process.exit(1);
  }
};

main();
