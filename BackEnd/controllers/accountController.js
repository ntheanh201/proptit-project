import accountsData from './accounts';
import uuid from 'uuid';

class Account {
  constructor() {
    (this.accounts = accountsData), (this.table = 'users');
  }

  getAllUsers() {
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

  addNewUser({username, passsword}) {
    // console.log(username)
    this.accounts = [...this.accounts, {id: uuid(), username, passsword }];
    return 'Add new user successfully';
  }
}

export const accountController = new Account();
