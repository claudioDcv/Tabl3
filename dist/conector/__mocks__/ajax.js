'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api');

var ajax = function ajax(opt, callback, errorCallback, nonErrorAjax, onAfterSend) {
  var response = {
    config: {},
    headers: {},
    request: {},
    data: _api.API[opt.url],
    status: 200,
    statusText: 'OK'
  };
  nonErrorAjax();
  callback(response.data, response, opt);
  onAfterSend(response);
  if (opt.simulateError) {
    errorCallback(response);
    return false;
  }
};

exports.default = ajax;
module.exports = exports['default'];