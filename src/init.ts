import { writeJSON } from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { InitResponse } from "./types";

const init = async (): Promise<void> => {
  try {
    const answers: InitResponse = await inquirer.prompt([
      { message: "Instagram Username", name: "username", type: "input" },
      { message: "Instagram Password", name: "password", type: "password" },
      {
        message:
          'Account List (Enter list of usernames separated by "," -- example: "cristiano,therock,alexlee3663"',
        name: "accountList",
        type: "input",
      },
    ]);
    const settings = {
      accounts: answers.accountList
        .split(",")
        .map((account) => ({ username: account })),
      password: answers.password,
      username: answers.username,
      outputDir: "./output",
    };
    await writeJSON(path.resolve(__dirname, '../settings.json'), settings, { spaces: 2 });
    console.log("Initialization successful!");
    process.exit(0);
  } catch (error) {
    console.error("Error during initialization.");
    console.error(error);
    process.exit(1);
  }
};

init();
