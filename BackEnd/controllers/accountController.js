import uuid from 'uuid';

import {
  patch_user_method,
  get_users_method,
  post_user_method,
  delete_user_method,
} from '../models/accountModel';

class Account {
  constructor() {
    this.table = 'users';
    this.accounts = [];
  }

  getAllUsers(req, res) {
    get_users_method(null, (err, users) => {
      if (err) res.send(err);
      else {
        this.accounts = users;
        res.send(this.accounts);
      }
    });
  }

  getUserById(userId, res) {
    get_users_method(userId, (err, users) => {
      if (err) res.send(err);
      else res.send(users[0]);
    });
  }

  editUser(user, res) {
    patch_user_method(user, (err, responseSV) => {
      if (err) console.log(err);
      else res.send('Patch successfully');
    });
    // this.accounts = this.accounts.map(account => {
    //   if (account.id === user.id) {
    //     return user;
    //   } else return account;
    // });
    // return this.accounts;
  }

  addNewUser(user, res) {
    post_user_method(
      {
        id: uuid(),
        user,
      },
      (err, responseSV) => {
        if (err) console.log(err);
        else res.send('Registration Successful');
      },
    );
  }

  deleteUser(user, res) {
    delete_user_method(user, (err, responseSV) => {
      if (err) console.log(err);
      else res.send('Delete Account Succesful');
    });
  }
}

export const accountController = new Account();
