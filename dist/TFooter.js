'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TFooter = function (_Component) {
  _inherits(TFooter, _Component);

  function TFooter() {
    _classCallCheck(this, TFooter);

    return _possibleConstructorReturn(this, (TFooter.__proto__ || Object.getPrototypeOf(TFooter)).apply(this, arguments));
  }

  _createClass(TFooter, [{
    key: 'render',
    value: function render() {
      var state = this.props.tableState;
      return _react2.default.createElement(
        'tfoot',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: state.columns.length + (state.config.table.thead.actions ? 1 : 0) },
            state.paginator.pages > 1 ? _react2.default.createElement(_Paginator2.default, {
              tableState: this.props.tableState,
              updateState: this.props.updateState
            }) : undefined
          )
        )
      );
    }
  }]);

  return TFooter;
}(_react.Component);

TFooter.propTypes = {
  updateState: _propTypes2.default.func,
  tableState: _propTypes2.default.object
};

exports.default = TFooter;
module.exports = exports['default'];