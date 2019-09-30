import accountsData from './accounts';

class Account {
  constructor() {
    (this.accounts = accountsData), (this.table = 'users');
  }

  getAllUsers() {
    this.accounts = accountsData;
    return this.accounts;
  }

  getUser(userId) {
    return this.accounts.find(({ id }) => id === userId);
  }

  editUser(user) {
    //check session
    this.accounts = this.accounts.map(account => {
      if (account.id === user.id) {
        return user;
      } else return account;
    });
    return this.accounts;
  }
}

export const accountController = new Account();
