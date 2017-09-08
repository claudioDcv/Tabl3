'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _core = require('../../../core/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* EXAMPLE
{
  title: 'Periodo',
  name: 'period',
  textEmpty: 'Sin Fecha',
  component: FieldMoment,
  dateFormat: 'YYYY-MM',
  input: 'period',
},
*/
exports.default = function (instance, column) {
  var object = (0, _core.dotNotationToObject)(instance, column.name);

  if (!column.dateFormat) {
    console.warn(column.name, 'missing (dateFormat) attribute, is required in column definition');
    return _react2.default.createElement(
      'span',
      null,
      object
    );
  }
  var date = _moment2.default.utc(object).local().format(column.dateFormat);
  return _react2.default.createElement(
    'span',
    null,
    date
  );
}; /* eslint no-console: 0 */


module.exports = exports['default'];