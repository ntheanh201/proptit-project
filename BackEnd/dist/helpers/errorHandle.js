'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var errorHandle = exports.errorHandle = function errorHandle(err, req, res, next) {
    return typeof err === 'string' ? res.status(400).json({ message: err }) : res.status(500).json({ message: err });
};