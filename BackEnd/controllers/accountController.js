class Account {
  constructor() {
    (this.accounts = []), (this.table = "users");
  }

  getAllUsers() {
    return this.accounts;
  }

  getUser(userId) {
    return this.accounts.find(({ id }) => id === userId);
  }

  editUser(id, ...infor) {
    //check session
  }
}

export const accountController = new Account();
