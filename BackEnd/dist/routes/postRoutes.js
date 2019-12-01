'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postRoute = _express2.default.Router();

postRoute.route('/').get(function (req, res) {
  var id = req.params.group_id;
  console.log('AppLog', id);
  _controllers.postController.getPostByGroup(id, res);
}).post(function (req, res) {
  var post = req.body;
  console.log('AppLog', post);
  _controllers.postController.postPost(post, res);
});

exports.default = postRoute;