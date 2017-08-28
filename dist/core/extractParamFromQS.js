'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paramArg, urlArg) {
  var url = urlArg;
  if (!url) {
    url = window.location.href;
  }
  var param = paramArg.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(url);
  if (!results) {
    return '';
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

module.exports = exports['default'];