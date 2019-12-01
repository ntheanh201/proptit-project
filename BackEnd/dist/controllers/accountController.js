'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _accountModel = require('../models/accountModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function () {
  function Account() {
    _classCallCheck(this, Account);

    this.table = 'users';
    this.accounts = [];
  }

  _createClass(Account, [{
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      var _this = this;

      (0, _accountModel.get_users_method)(null, function (err, users) {
        if (err) res.send(err);else {
          _this.accounts = users;
          res.send(_this.accounts);
        }
      });
    }
  }, {
    key: 'getUserById',
    value: function getUserById(userId, res) {
      (0, _accountModel.get_users_method)(userId, function (err, users) {
        if (err) res.send(err);else res.send(users[0]);
      });
    }
  }, {
    key: 'editUser',
    value: function editUser(user, res) {
      (0, _accountModel.patch_user_method)(user, function (err, responseSV) {
        if (err) console.log(err);else res.send('Patch successfully');
      });
      // this.accounts = this.accounts.map(account => {
      //   if (account.id === user.id) {
      //     return user;
      //   } else return account;
      // });
      // return this.accounts;
    }
  }, {
    key: 'addNewUser',
    value: function addNewUser(user, res) {
      (0, _accountModel.post_user_method)({
        id: (0, _uuid2.default)(),
        user: user
      }, function (err, responseSV) {
        if (err) console.log(err);else res.send('Registration Successful');
      });
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(user, res) {
      (0, _accountModel.delete_user_method)(user, function (err, responseSV) {
        if (err) console.log(err);else res.send('Delete Account Succesful');
      });
    }
  }]);

  return Account;
}();

var accountController = exports.accountController = new Account();