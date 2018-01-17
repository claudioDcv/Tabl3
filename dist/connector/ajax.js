'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = function ajax(opt, callback, errorCallback, nonErrorAjax, onAfterSend) {
  (0, _axios2.default)(opt).then(function (response) {
    nonErrorAjax();
    callback(response.data, response, opt);
    onAfterSend(response);
  }, function (response) {
    return errorCallback(response);
  });
};

exports.default = ajax;
module.exports = exports['default'];