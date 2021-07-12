import { readJSON } from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";
import {
  loginButtonSelector,
  notNowNotificationsButtonSelector,
  notNowRememberButtonSelector,
  passwordFieldSelector,
  usernameFieldSelector,
} from "./constants";
import { Settings } from "./types";

const main = async () => {
  let browser;
  try {
    const settings: Settings = await readJSON(
      path.resolve(__dirname, "../settings.json")
    );
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const username = settings.username;
    const password = settings.password;

    if (!username || !password) {
      throw new Error("No username or password set!");
    }

    await page.goto("https://www.instagram.com/", {
      waitUntil: "networkidle2",
    });

    const usernameField = await page.$(usernameFieldSelector);
    const passwordField = await page.$(passwordFieldSelector);

    if (!usernameField || !passwordField) {
      throw new Error("Could not find inputs on login page!");
    }

    await usernameField.type(username);
    await passwordField.type(password);

    const loginButton = await page.$(loginButtonSelector);
    if (!loginButton) {
      throw new Error("Could not find login button on login page!");
    }
    await loginButton.click();
    await page.waitForNavigation();

    const notNowRememberButton = await page.$(notNowRememberButtonSelector);
    if (!notNowRememberButton) {
      throw new Error("Could not find not now button after login page!");
    }
    await notNowRememberButton.click();
    await page.waitForNavigation();

    const notNowNotificationsButton = await page.$(
      notNowNotificationsButtonSelector
    );
    if (!notNowNotificationsButton) {
      throw new Error(
        "Could not find not now notitfications button on home page!"
      );
    }
    await notNowNotificationsButton.click();

    await page.screenshot({ path: "home-page.png", type: "png" });

    for (let i = 0; i < settings.accounts.length; i++) {
      const account = settings.accounts[i];

      await page.goto(`https://www.instagram.com/${account.username}/`, {
        waitUntil: "networkidle2",
      });
      await page.screenshot({ path: `${account.username}.png`, type: "png" });
    }

    await browser.close();
  } catch (error) {
    browser?.close();
    console.error(error);
    process.exit(1);
  }
};

main();
