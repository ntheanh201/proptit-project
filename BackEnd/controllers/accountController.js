import uuid from 'uuid';
import { getUsers, addUser } from '../models/accountModel';

class Account {
  constructor() {
    this.table = 'users';
    this.accounts = [];
  }

  getAllUsers(req, res) {
    getUsers((err, users) => {
      if (err) res.send(err);
      console.log('res', users);
      this.accounts = users;
      res.send(this.accounts);
    });
  }

  getUserById(useId, res) {
    return this.accounts.find(({ id }) => id === userId);
  }

  // editUser(user) {
  //   this.accounts = this.accounts.map(account => {
  //     if (account.id === user.id) {
  //       return user;
  //     } else return account;
  //   });
  //   return this.accounts;
  // }

  addNewUser(
    {
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
    res,
  ) {
    addUser(
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
      (err, user) => {
        res.send(user);
      },
    );
  }
}

export const accountController = new Account();
