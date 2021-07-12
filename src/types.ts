export interface Account {
  username: string;
}

export interface Change {
  account: Account;
  post: string;
}

export interface Settings {
  accounts: Account[];
  password: string;
  username: string;
}
