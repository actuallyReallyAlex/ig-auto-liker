// ********************
// * SELECTORS
// ********************
export const likeButtonSelector =
  'article > div:nth-child(4) > section:nth-child(1) > span > button > div > span > svg[aria-label="Like"';
export const loginButtonSelector = 'button[type="submit"]';
export const notNowRememberButtonSelector =
  "#react-root > section > main > div > div > div > div > button";
export const notNowNotificationsButtonSelector =
  "body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm";
export const passwordFieldSelector =
  "#loginForm > div > div:nth-child(2) > div > label > input";
export const post1Selector = "article > div > div > div > div:nth-child(1) > a";
export const post2Selector = "article > div > div > div > div:nth-child(2) > a";
export const post3Selector = "article > div > div > div > div:nth-child(3) > a";
export const usernameFieldSelector =
  "#loginForm > div > div:nth-child(1) > div > label > input";

// ********************
// * MAXIMUMS
// ********************
export const maximums = {
  follows: {
    day: 150,
    hour: 20,
  },
  likes: {
    day: 50,
  },
};
