import uuid from 'uuid';
import { connection } from '../database';

class Account {
  constructor() {
    this.accounts = [];
    this.table = 'users';
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
    password,
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
        password,
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
