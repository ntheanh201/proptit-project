'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accountController = require('./accountController');

Object.keys(_accountController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _accountController[key];
    }
  });
});

var _postController = require('./postController');

Object.keys(_postController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _postController[key];
    }
  });
});

var _authController = require('./authController');

Object.keys(_authController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authController[key];
    }
  });
});