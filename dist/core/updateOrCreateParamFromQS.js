'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  var separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  }
  return '' + uri + separator + key + '=' + value;
};

module.exports = exports['default'];