import BaseService from './BaseService';
import { Post } from '../core';
import axios from 'axios';

class PostService extends BaseService<Post> {
  constructor() {
    super()
    this.baseURL += '/posts'
  }

  getByGroup(groupId: string): Promise<Post[]> {
    return axios
      .get(this.baseURL + `/${groupId}`)
      .then(res => {
        return res.data
      })
      .catch(err => console.log(err))
  }
}

export const postService = new PostService()
