'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accountRoutes = require('./accountRoutes');

Object.keys(_accountRoutes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _accountRoutes[key];
    }
  });
});

var _newsRoutes = require('./newsRoutes');

Object.keys(_newsRoutes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _newsRoutes[key];
    }
  });
});

var _authRoutes = require('./authRoutes');

Object.keys(_authRoutes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authRoutes[key];
    }
  });
});