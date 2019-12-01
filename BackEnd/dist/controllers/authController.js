'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _configs = require('../configs');

var _accountModel = require('../models/accountModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import {} from '../database'

var HandlerGenerator = function () {
  function HandlerGenerator() {
    _classCallCheck(this, HandlerGenerator);
  }

  _createClass(HandlerGenerator, [{
    key: 'login',
    value: function login(req, res) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;
      // For the given username fetch user from DB

      var mockedUsername = 'admin';
      var mockedPassword = 'password';

      // auth_user_method({ username, password }, (error, response) => {
      //   // mockedUsername = result;
      // });

      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          var token = _jsonwebtoken2.default.sign({ username: username }, _configs.secret, {
            expiresIn: '24h'
          });

          return res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          return res.json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        return res.sendStatus(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
  }, {
    key: 'index',
    value: function index(req, res) {
      return res.json({
        success: true,
        message: 'Index page',
        id: ''
      });
    }
  }]);

  return HandlerGenerator;
}();

var authController = exports.authController = new HandlerGenerator();