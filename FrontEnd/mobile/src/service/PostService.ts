import BaseService from './BaseService';
import {Post} from '../core';
import axios from 'axios';

class PostService extends BaseService<Post> {
  constructor() {
    super();
    this.baseURL += '/posts';
  }

  getByGroup(groupId: String): Promise<Post[]> {
    this.baseURL += `/${groupId}`;
    return axios
      .get(this.baseURL)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }
}

export const postService = new PostService();
