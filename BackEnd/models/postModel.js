import { connection } from '../database';

const POSTS_TABLE = 'posts';

export const post_post_method = (
  { userId, groupId, content, type = 1 },
  result,
) => {
  const sql = `INSERT INTO ${POSTS_TABLE}(userId, groupId, content, type) 
                VALUES (${userId}', '${groupId}', '${content}', '${type}')`;
  connection.query(sql, (err, res) => {
    console.log(sql);
    if (err) {
      console.log('AppLog', err);
    } else {
      result(res);
    }
  });
};

/**
 * get all post from database
 */

export const get_all_posts_method = (groupId, result) => {
  const sql = `SELECT * FROM ${POSTS_TABLE} WHERE groupId = '${groupId}'`;
  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      return;
    } else {
      result(res);
    }
  });
};

export const patch_post_method = (id, content, result) => {
  const sql = `UPDATE posts SET content = '${content}' WHERE id = '${id}'`;
  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      return;
    } else {
      result(res);
    }
  });
};

export const delete_post_method = (id, result) => {
  const sql = `DELETE FROM posts WHERE id = '${id}'`;
  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      return;
    } else {
      result(res);
    }
  });
};
