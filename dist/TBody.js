'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TR = require('./TR');

var _TR2 = _interopRequireDefault(_TR);

var _core = require('./core/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMPTY_RESULTS = 'No se encontraron resultados';
var styleEmptyTd = {
  textAlign: 'center',
  verticalAlign: 'middle',
  height: '150px'
};

var TBody = function (_Component) {
  _inherits(TBody, _Component);

  function TBody() {
    _classCallCheck(this, TBody);

    return _possibleConstructorReturn(this, (TBody.__proto__ || Object.getPrototypeOf(TBody)).apply(this, arguments));
  }

  _createClass(TBody, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          tableState = _props.tableState,
          getEmptyMessage = _props.getEmptyMessage,
          updateState = _props.updateState;

      var colSpan = tableState.columns.length + (tableState.config.table.thead.actions ? 1 : 0);

      if (!tableState.dataset) {
        return _react2.default.createElement('tbody', null);
      }
      return _react2.default.createElement(
        'tbody',
        null,
        tableState.dataset.results.length > 0 ? tableState.dataset.results.map(function (e, key) {
          var comp = _react2.default.createElement(_TR2.default, {
            key: (0, _core.makeKey)(key),
            element: e,
            tableState: tableState,
            updateState: updateState
          });

          return comp;
        }) : getEmptyMessage && getEmptyMessage instanceof Function ? getEmptyMessage({
          colSpan: colSpan
        }) : _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: styleEmptyTd, colSpan: colSpan },
            EMPTY_RESULTS
          )
        )
      );
    }
  }]);

  return TBody;
}(_react.Component);

TBody.propTypes = {
  getEmptyMessage: _propTypes2.default.func,
  updateState: _propTypes2.default.func,
  tableState: _propTypes2.default.object
};

exports.default = TBody;
module.exports = exports['default'];