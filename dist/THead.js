'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _es = require('./es');

var _es2 = _interopRequireDefault(_es);

var _core = require('./core/core');

var _HeaderBtn = require('./HeaderBtn');

var _HeaderBtn2 = _interopRequireDefault(_HeaderBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thead = function (_Component) {
  _inherits(Thead, _Component);

  function Thead() {
    _classCallCheck(this, Thead);

    return _possibleConstructorReturn(this, (Thead.__proto__ || Object.getPrototypeOf(Thead)).apply(this, arguments));
  }

  _createClass(Thead, [{
    key: 'TH',
    value: function TH(e, key) {
      return _react2.default.createElement(
        'th',
        {
          key: (0, _core.makeKey)(key),
          rowSpan: e.rowSpan || 1,
          className: e.className,
          style: e.cssTH
        },
        _react2.default.createElement(_HeaderBtn2.default, {
          element: e,
          tableState: this.props.tableState,
          updateState: this.props.updateState,
          handlerInputSearch: this.props.handlerInputSearch
        })
      );
    }
  }, {
    key: 'actions',
    value: function actions() {
      var thead = this.props.tableState.config.table.thead;
      return _react2.default.createElement(
        'th',
        { style: thead.actions.style, className: thead.actions.className },
        _react2.default.createElement(
          'span',
          { className: 'table2-btn-ordering-disabled' },
          thead.actions.title || _es2.default.actions
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var thead = this.props.tableState.config.table.thead;
      var config = this.props.tableState.config;
      var state = this.props.tableState;
      return _react2.default.createElement(
        'thead',
        { className: thead.className },
        config.table.resetButton || config.table.theadExtra ? _react2.default.createElement(
          'tr',
          null,
          config.table.resetButton ? _react2.default.createElement(
            'td',
            {
              colSpan: state.columns.length + (state.config.table.thead.actions ? 1 : 0)
            },
            _react2.default.createElement(
              'button',
              {
                onClick: this.props.resetToInitialState,
                className: 'table2-btn-reset ' + config.table.resetButton.className
              },
              config.table.resetButton.title
            )
          ) : undefined,
          typeof config.table.theadExtra === 'function' ? config.table.theadExtra(this.props.tableState.paginator) : undefined
        ) : undefined,
        _react2.default.createElement(
          'tr',
          null,
          this.props.tableState.columns.map(function (e, key) {
            return _this2.TH(e, key);
          }),
          thead.actions ? this.actions() : undefined
        )
      );
    }
  }]);

  return Thead;
}(_react.Component);

Thead.propTypes = {
  updateState: _propTypes2.default.func,
  tableState: _propTypes2.default.object,
  handlerInputSearch: _propTypes2.default.func,
  resetToInitialState: _propTypes2.default.func
};

exports.default = Thead;
module.exports = exports['default'];