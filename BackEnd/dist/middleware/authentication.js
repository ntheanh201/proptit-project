'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _configs = require('../configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkToken = exports.checkToken = function checkToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization'] || "";
  if (token.startsWith('ProProject ')) {
    token = token.slice(11, token.length);
  }
  // console.log(token)
  if (token) {
    _jsonwebtoken2.default.verify(token, _configs.secret, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};