import {
  get_all_posts_method,
  post_post_method,
  delete_post_method,
  patch_post_method,
} from '../models/postModel';

class Post {
  constructor() {}

  getPostByGroup(groupId, res) {
    get_all_posts_method(groupId, result => {
      res.send(result);
    });
  }

  postPost(post, res) {
    post_post_method(post, result => {
      res.send(result);
    });
  }

  deletePostById(id, res) {
    delete_post_method(id, result => {
      res.send(result);
    });
  }

  updatePostById(id, content, res) {
    patch_post_method(id, content, result => {
      res.send(result);
    });
  }
}

export const postController = new Post();
