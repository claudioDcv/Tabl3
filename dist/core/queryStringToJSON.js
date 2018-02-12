'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (qs) {
  var queryString = qs;
  var pairs = '';
  var result = {};
  if (queryString) {
    if (queryString.indexOf('?') > -1) {
      queryString = queryString.split('?')[1];
    }
    pairs = queryString.split('&');
    pairs.forEach(function (p) {
      var pair = p;
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
  }
  return result;
};

module.exports = exports['default'];