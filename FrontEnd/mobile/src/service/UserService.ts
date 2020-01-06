import BaseService from './BaseService';
import {User} from '../core';

class UserService extends BaseService<User> {
  constructor() {
    super();
    this.baseURL += '/accounts';
  }
}

export const userService = new UserService();
