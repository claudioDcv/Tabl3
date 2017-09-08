'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _const = require('../core/const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrevBtn = function (_React$Component) {
  _inherits(PrevBtn, _React$Component);

  function PrevBtn() {
    _classCallCheck(this, PrevBtn);

    return _possibleConstructorReturn(this, (PrevBtn.__proto__ || Object.getPrototypeOf(PrevBtn)).apply(this, arguments));
  }

  _createClass(PrevBtn, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isDisabled = this.props.tableState.paginator.firstPage;
      var classDisabled = isDisabled ? 'disabled' : '';
      return _react2.default.createElement(
        'li',
        { className: classDisabled },
        _react2.default.createElement(
          'a',
          {
            role: 'button',
            tabIndex: '0',
            onClick: function onClick() {
              if (!isDisabled) {
                _this2.props.updateState(_const.PAGINATOR_PREV_PAGE);
              }
            }
          },
          _react2.default.createElement(
            'span',
            { 'aria-hidden': 'true', className: 'table-2-new-prev-btn' },
            '\xAB'
          )
        )
      );
    }
  }]);

  return PrevBtn;
}(_react2.default.Component);

PrevBtn.propTypes = {
  tableState: _propTypes2.default.object,
  updateState: _propTypes2.default.func
};

exports.default = PrevBtn;
module.exports = exports['default'];