'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helpers = require('./helpers');

var _authRoutes = require('./routes/authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _accountRoutes = require('./routes/accountRoutes');

var _accountRoutes2 = _interopRequireDefault(_accountRoutes);

var _postRoutes = require('./routes/postRoutes');

var _postRoutes2 = _interopRequireDefault(_postRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use((0, _cors2.default)());
app.use(_helpers.errorHandle);

app.use('/proptit', _authRoutes2.default);
app.use('/proptit/accounts', _accountRoutes2.default);
app.use('/proptit/posts', _postRoutes2.default);

var port = process.env.NODE_ENV === 'production' ? 80 : 8080;
app.listen(port, function () {
  return console.log('App listening on port ' + port + '!');
});