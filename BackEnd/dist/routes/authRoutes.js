'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _middleware = require('../middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRoute = _express2.default.Router();

authRoute.post('/login', _middleware.checkToken, _controllers.authController.login);
authRoute.get('/', _middleware.checkToken, _controllers.authController.index);

exports.default = authRoute;