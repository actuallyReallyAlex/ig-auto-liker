import { Account } from "./types";

export const loginButtonSelector = 'button[type="submit"]';
export const notNowRememberButtonSelector =
  "#react-root > section > main > div > div > div > div > button";
export const notNowNotificationsButtonSelector =
  "body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm";
export const passwordFieldSelector =
  "#loginForm > div > div:nth-child(2) > div > label > input";
export const usernameFieldSelector =
  "#loginForm > div > div:nth-child(1) > div > label > input";

// Top 3 Accounts on Instagram
export const accountList: Account[] = [
  {
    username: "instagram",
  },
  {
    username: "cristiano",
  },
  {
    username: "therock",
  },
];
