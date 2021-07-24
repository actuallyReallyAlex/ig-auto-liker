import { ElementHandle, Page } from "puppeteer";
import {
  likeButtonSelector,
  loginButtonSelector,
  notNowNotificationsButtonSelector,
  notNowRememberButtonSelector,
  passwordFieldSelector,
  post1Selector,
  post2Selector,
  post3Selector,
  usernameFieldSelector,
} from "./constants";
import { Account, Change, Settings } from "./types";

const navigateToLoginPage = async (
  settings: Settings,
  page: Page
): Promise<{
  username: string;
  password: string;
  usernameField: ElementHandle<Element>;
  passwordField: ElementHandle<Element>;
}> => {
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

  return { username, password, usernameField, passwordField };
};

const submitLoginForm = async (
  page: Page,
  username: string,
  password: string,
  usernameField: ElementHandle<Element>,
  passwordField: ElementHandle<Element>
): Promise<void> => {
  await usernameField.type(username);
  await passwordField.type(password);

  const loginButton = await page.$(loginButtonSelector);
  if (!loginButton) {
    throw new Error("Could not find login button on login page!");
  }
  await loginButton.click();
  await page.waitForNavigation();
};

const disableRememberUser = async (page: Page): Promise<void> => {
  const notNowRememberButton = await page.$(notNowRememberButtonSelector);
  if (!notNowRememberButton) {
    throw new Error("Could not find not now button after login page!");
  }
  await notNowRememberButton.click();
  await page.waitForNavigation();
};

const disableNotifications = async (page: Page): Promise<void> => {
  const notNowNotificationsButton = await page.$(
    notNowNotificationsButtonSelector
  );
  if (!notNowNotificationsButton) {
    throw new Error(
      "Could not find not now notitfications button on home page!"
    );
  }
  await notNowNotificationsButton.click();
};

export const login = async (settings: Settings, page: Page): Promise<void> => {
  try {
    // * Navigate to Login Form
    const { username, password, usernameField, passwordField } =
      await navigateToLoginPage(settings, page);

    // * Submit Login Form
    await submitLoginForm(
      page,
      username,
      password,
      usernameField,
      passwordField
    );

    // * Tell Browser not To Remember Login Info
    await disableRememberUser(page);

    // * Tell Browser not to Turn on Notifications
    await disableNotifications(page);
  } catch (error) {
    console.error(error);
  }
};

export const likePost = async (
  page: Page,
  account: Account,
  post: string | null,
  changes: Change[]
): Promise<void> => {
  try {
    await page.goto(`https://www.instagram.com${post}`, {
      waitUntil: "networkidle2",
    });
    const likeButton = await page.$(likeButtonSelector);
    if (likeButton) {
      await likeButton.click();
      const change: Change = {
        account,
        post: `https://www.instagram.com${post}`,
      };
      changes.push(change);
    }
  } catch (error) {
    console.error(error);
  }
};

export const likePosts = async (
  page: Page,
  changes: Change[],
  account: Account
): Promise<void> => {
  try {
    const posts: (string | null)[] = [];

    await page.goto(`https://www.instagram.com/${account.username}/`, {
      waitUntil: "networkidle2",
    });

    const post1 = await page.$eval(post1Selector, (element) => {
      return element.getAttribute("href");
    });
    const post2 = await page.$eval(post2Selector, (element) => {
      return element.getAttribute("href");
    });
    const post3 = await page.$eval(post3Selector, (element) => {
      return element.getAttribute("href");
    });

    posts.push(post1);
    posts.push(post2);
    posts.push(post3);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      await likePost(page, account, post, changes);
    }
  } catch (error) {
    console.error(error);
  }
};
