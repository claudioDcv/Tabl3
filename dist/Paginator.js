'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _const = require('./core/const');

var _core = require('./core/core');

var _NextBtn = require('./paginator/NextBtn');

var _NextBtn2 = _interopRequireDefault(_NextBtn);

var _PrevBtn = require('./paginator/PrevBtn');

var _PrevBtn2 = _interopRequireDefault(_PrevBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paginator = function (_Component) {
  _inherits(Paginator, _Component);

  function Paginator(props) {
    _classCallCheck(this, Paginator);

    var _this = _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this, props));

    _this.update = _this.update.bind(_this);
    return _this;
  }

  _createClass(Paginator, [{
    key: 'update',
    value: function update(key, val) {
      this.props.updateState(key, val);
    }
  }, {
    key: 'numberPagination',
    value: function numberPagination() {
      var _this2 = this;

      var config = this.props.tableState.config.paginator;
      var paginator = this.props.tableState.paginator;
      var current = paginator.current;
      if (paginator) {
        if (!config.prevLink && parseInt(config.prevLink, 10) !== 0) {
          config.prevLink = 3;
        }
        if (!config.nextLink && parseInt(config.nextLink, 10) !== 0) {
          config.nextLink = 3;
        }

        var lengthPagation = [];
        var min = current - config.prevLink < 1 ? 1 : current - config.prevLink;
        var currNextLink = paginator.current + config.nextLink;
        var max = current + config.nextLink > paginator.pages ? paginator.pages : currNextLink;

        for (var i = min; i <= max; i += 1) {
          lengthPagation.push(i);
        }

        return lengthPagation.map(function (nPage, key) {
          var classCurrent = current === nPage ? 'active' : '';
          if (classCurrent === 'active') {
            return _react2.default.createElement(
              'li',
              { key: (0, _core.makeKey)(key), className: classCurrent },
              _react2.default.createElement(
                'span',
                null,
                nPage
              )
            );
          }
          return _react2.default.createElement(
            'li',
            { key: (0, _core.makeKey)(key) },
            _react2.default.createElement(
              'a',
              {
                className: classCurrent,
                role: 'button',
                tabIndex: '0',
                onClick: function onClick() {
                  return _this2.update(_const.PAGINATOR_GOTO_PAGE, nPage);
                }
              },
              nPage
            )
          );
        });
      }
      return undefined;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        {
          className: 'table-2-new-paginator ' + (this.props.tableState.config.paginator.className || ''),
          style: this.props.tableState.config.paginator.style || {}
        },
        _react2.default.createElement(_PrevBtn2.default, { tableState: this.props.tableState, updateState: this.props.updateState }),
        this.numberPagination(),
        _react2.default.createElement(_NextBtn2.default, { tableState: this.props.tableState, updateState: this.props.updateState })
      );
    }
  }]);

  return Paginator;
}(_react.Component);

Paginator.propTypes = {
  updateState: _propTypes2.default.func,
  tableState: _propTypes2.default.object
};

exports.default = Paginator;
module.exports = exports['default'];