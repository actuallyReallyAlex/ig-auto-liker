import { readJSON } from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";
import { maximums } from "./constants";
import { likePosts, login } from "./steps";
import { Change, Settings } from "./types";

const main = async () => {
  let browser;
  let page;
  try {
    const settings: Settings = await readJSON(
      path.resolve(__dirname, "../settings.json")
    );
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
    console.log(JSON.stringify({ changes }, null, 2));
  } catch (error) {
    browser?.close();
    page?.screenshot({ path: "error.png", type: "png" });
    console.error(error);
    process.exit(1);
  }
};

main();
