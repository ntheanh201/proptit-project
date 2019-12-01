'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _middleware = require('../middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountRoute = _express2.default.Router();

accountRoute.route('/').get(function (req, res) {
  _controllers.accountController.getAllUsers(req, res);
}).post(function (req, res) {
  _controllers.accountController.addNewUser(req.body, res);
}).patch(function (req, res) {
  _controllers.accountController.editUser(req.body, res);
}).delete(function (req, res) {
  _controllers.accountController.deleteUser(req.body, res);
});

accountRoute.get('/:id', function (req, res) {
  _controllers.accountController.getUserById(req.params.id, res);
});

exports.default = accountRoute;