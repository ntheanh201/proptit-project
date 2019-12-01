'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = undefined;

var _mysql = require('mysql2');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export const connection = mysql.createConnection({
//   host: '35.240.232.224',
//   user: 'root',
//   password: '',
//   port: '',
//   database: 'proptit',
// });

var connection = exports.connection = _mysql2.default.createConnection({
  host: '35.240.232.224',
  user: 'root',
  password: '',
  port: '3306',
  database: 'proptit'
});

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'proptit',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });