'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth_user_method = exports.delete_user_method = exports.patch_user_method = exports.post_user_method = exports.get_users_method = undefined;

var _database = require('../database');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get_users_method = exports.get_users_method = function get_users_method(filterID, result) {
  var query = 'SELECT * FROM users';
  if (filterID) query += 'WHERE id = "' + filterID + '"';
  _database.connection.query(query, function (error, res) {
    if (error) {
      console.log(error);
      return;
    }
    result(null, res);
  });
};

var post_user_method = exports.post_user_method = function post_user_method(_ref, result) {
  var id = _ref.id,
      user = _ref.user;

  _database.connection.query('INSERT INTO users(id, username, password, displayName, dateOfBirth, className, phoneNumber, email, facebook, description) VALUES (\'' + id + '\',\'' + user.username + '\',\'' + user.password + '\', \'' + user.displayName + '\', \'' + user.dateOfBirth + '\', \'' + user.className + '\', \'' + user.phoneNumber + '\', \'' + user.email + '\', \'' + user.facebook + '\', \'' + user.description + '\')', function (error, res) {
    if (error) {
      console.log(error);
      return;
    }
    //   let user = JSON.parse(JSON.stringify(res[0]));
    result(null, res);
  });
};

var patch_user_method = exports.patch_user_method = function patch_user_method(user, result) {
  _database.connection.query('UPDATE users SET username = "' + user.username + '", password = "' + user.password + '", displayName = "' + user.displayName + '", className = "' + user.className + '", dateOfBirth = "' + user.dateOfBirth + '", phoneNumber = "' + user.phoneNumber + '", email = "' + user.email + '", facebook = "' + user.facebook + '", description = "' + user.description + '" WHERE id = "' + user.id + '"', function (err, res) {
    if (err) result(err, null);
    result(null, res);
  });
};

var delete_user_method = exports.delete_user_method = function delete_user_method(user, result) {
  _database.connection.query('DELETE FROM users WHERE id = "' + user.id + '"', function (err, res) {
    if (err) result(err, null);
    result(null, res);
  });
};

var auth_user_method = exports.auth_user_method = function auth_user_method(_ref2, result) {
  var username = _ref2.username,
      password = _ref2.password;

  var passExist = password ? 'AND password = ' + password : null;
  _database.connection.query('SELECT FROM users WHERE username = "' + username + '" ' + passExist, function (err, res) {
    if (err) result(err, null);
    console.log(res);
    result(null, res);
  });
};