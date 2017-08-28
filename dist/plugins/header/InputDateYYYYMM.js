'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');

var renderers = {
  renderDay: function renderDay(props, currentDate, selectedDate) {
    return _react2.default.createElement(
      'td',
      props,
      '0' + currentDate.date()
    );
  },
  renderMonth: function renderMonth(props, month, year, selectedDate) {
    return _react2.default.createElement(
      'td',
      props,
      month
    );
  },
  renderYear: function renderYear(props, year, selectedDate) {
    return _react2.default.createElement(
      'td',
      props,
      year % 100
    );
  }
};

var InputDate = function InputDate(handlerChangeInput, instance, value) {
  var makeDate = function makeDate(e) {
    var isError = false;
    var format = '';
    try {
      format = e.format('YYYY-MM');
      format = format + '-01';
    } catch (e) {
      format = '';
      isError = true;
    } finally {}
    return format;
  };
  var placeholderConst = instance.placeholder ? instance.placeholder : '';
  return _react2.default.createElement(
    'div',
    { className: 'table-2-input-container-date' },
    _react2.default.createElement(
      'button',
      {
        className: 'table-2-input-clear-date',
        onClick: function onClick() {
          if (instance.inputChangeToggle) {
            var elm = document.getElementById(instance.inputChangeToggle.id);
            elm.style.minHeight = 'auto';
          }
          handlerChangeInput('');
        }
      },
      '\xD7'
    ),
    _react2.default.createElement(_reactDatetime2.default, {
      onChange: function onChange(e) {
        var format = makeDate(e);
        handlerChangeInput(format);
      },
      onFocus: function onFocus() {
        if (instance.inputChangeToggle) {
          var elm = document.getElementById(instance.inputChangeToggle.id);
          elm.style.minHeight = instance.inputChangeToggle.minHeight;
        }
      },
      onBlur: function onBlur() {
        if (instance.inputChangeToggle) {
          var elm = document.getElementById(instance.inputChangeToggle.id);
          elm.style.minHeight = 'auto';
        }
      },
      closeOnSelect: true,
      inputProps: {
        placeholder: placeholderConst
      },
      locale: 'es',
      open: false,
      input: true,
      value: value ? value.slice(0, -3) : '',
      dateFormat: 'YYYY-MM',
      timeFormat: false
    })
  );
};

exports.default = InputDate;
module.exports = exports['default'];