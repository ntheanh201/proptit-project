'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_all_posts_method = exports.post_post_method = undefined;

var _database = require('../database');

var POSTS_TABLE = 'posts';

var post_post_method = exports.post_post_method = function post_post_method() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : post,
      id = _ref.id,
      userId = _ref.userId,
      groupId = _ref.groupId,
      content = _ref.content,
      type = _ref.type;

  var result = arguments[1];

  var sql = 'INSERT INTO ' + POSTS_TABLE + '(id, userId, groupId, content, type) \n                VALUES (\'' + id + '\', \'' + userId + '\', \'' + groupId + '\', \'' + content + '\', \'' + type + '\')';
  _database.connection.query(sql, function (err, res) {
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

var get_all_posts_method = exports.get_all_posts_method = function get_all_posts_method(groupId, result) {
  var sql = 'SELECT * FROM ' + POSTS_TABLE;
  _database.connection.query(sql, function (err, res) {
    if (err) {
      console.log(err);
      return;
    } else {
      result(res);
    }
  });
};