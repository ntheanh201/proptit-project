'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postModel = require('../models/postModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Post = function () {
  function Post() {
    _classCallCheck(this, Post);
  }

  _createClass(Post, [{
    key: 'getPostByGroup',
    value: function getPostByGroup(groupId, res) {
      (0, _postModel.get_all_posts_method)(groupId, function (result) {
        res.send(result);
      });
    }
  }, {
    key: 'postPost',
    value: function postPost() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : post,
          id = _ref.id,
          userId = _ref.userId,
          groupId = _ref.groupId,
          content = _ref.content,
          type = _ref.type;

      var res = arguments[1];

      (0, _postModel.post_post_method)(post, function (result) {
        res.send(result);
      });
    }
  }]);

  return Post;
}();

var postController = exports.postController = new Post();