'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (param, urlArg) {
  // prefer to use l.search if you have a location/link object
  var url = urlArg;
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(param) + '=';
    var pars = urlparts[1].split(/[&;]/g);
    // reverse iteration as may be destructive
    for (var i = pars.length - 1; i > 0; i -= 1) {
      // idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }
    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
};

module.exports = exports['default'];