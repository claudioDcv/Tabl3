'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

require('react-select/dist/react-select.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var select = function select(handlerChangeInput, instance, value) {
  return _react2.default.createElement(_reactSelect2.default, _extends({}, instance.inputProps, {
    onFocus: function onFocus() {
      if (instance.inputChangeToggle) {
        var elm = document.getElementById(instance.inputChangeToggle.id);
        elm.style.minHeight = instance.inputChangeToggle.minHeight;
      }
    },
    openOnFocus: true,
    onOpen: function onOpen() {
      if (instance.inputChangeToggle) {
        var elm = document.getElementById(instance.inputChangeToggle.id);
        elm.style.minHeight = instance.inputChangeToggle.minHeight;
      }
    },
    onClose: function onClose() {
      if (instance.inputChangeToggle) {
        var elm = document.getElementById(instance.inputChangeToggle.id);
        elm.style.minHeight = 'auto';
      }
    },
    name: instance.name,
    placeholder: instance.placeholder,
    value: value,
    options: instance.data,
    onChange: handlerChangeInput
  }));
};

exports.default = select;
module.exports = exports['default'];