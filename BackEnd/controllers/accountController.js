import accountsData from './accounts';
import uuid from 'uuid';

class Account {
  constructor() {
    this.accounts = accountsData;
  }

  getAllUsers() {
    return this.accounts;
  }

  getUser(userId) {
    return this.accounts.find(({ id }) => id === userId);
  }

  editUser(user) {
    this.accounts = this.accounts.map(account => {
      if (account.id === user.id) {
        return user;
      } else return account;
    });
    return this.accounts;
  }

  addNewUser({
    username,
    passsword,
    displayName,
    className,
    dateOfBirth,
    phoneNumber,
    email,
    facebook,
    description,
  }) {
    this.accounts = [
      ...this.accounts,
      {
        id: uuid(),
        username,
        passsword,
        displayName,
        className,
        dateOfBirth,
        phoneNumber,
        email,
        facebook,
        description,
      },
    ];
  }
}

export const accountController = new Account();
