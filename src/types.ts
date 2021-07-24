export interface Account {
  username: string;
}

export interface Change {
  account: Account;
  post: string;
}

export interface InitResponse {
  accountList: string;
  password: string;
  username: string;
}

export interface Settings {
  accounts: Account[];
  outputDir: string;
  password: string;
  username: string;
}
