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

var _es = require('./es');

var _es2 = _interopRequireDefault(_es);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderBtn = function (_Component) {
  _inherits(HeaderBtn, _Component);

  _createClass(HeaderBtn, null, [{
    key: 'nameInputSearch',
    value: function nameInputSearch(element) {
      return element.name;
    }
  }]);

  function HeaderBtn(props) {
    _classCallCheck(this, HeaderBtn);

    var _this = _possibleConstructorReturn(this, (HeaderBtn.__proto__ || Object.getPrototypeOf(HeaderBtn)).call(this, props));

    _this.update = _this.update.bind(_this);
    _this.handlerChangeInput = _this.handlerChangeInput.bind(_this);
    return _this;
  }

  _createClass(HeaderBtn, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.handlerInputSearch(HeaderBtn.nameInputSearch(this.props.element), {
        value: '',
        search: this.props.element.input
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var ordering = this.props.element.ordering || this.props.element.name;
      this.props.updateState(_const.RESULTS_ORDERING, ordering);
    }
  }, {
    key: 'makeClassName',
    value: function makeClassName() {
      var paginator = this.props.tableState.paginator;
      var element = this.props.element;
      var className = 'table2-btn-ordering';
      var orderingAsc = className + ' table2-btn-ordering-asc';
      var orderingDesc = className + ' table2-btn-ordering-desc';
      var compareWith = element.name;
      if (element.name.indexOf('.') !== -1) {
        compareWith = element.ordering;
      }
      if (compareWith === paginator.orderingBy) {
        className = paginator.orderingMode === '' ? orderingDesc : orderingAsc;
      }
      return className;
    }
  }, {
    key: 'handlerChangeInput',
    value: function handlerChangeInput(event) {
      var value = event || '';
      if (event instanceof Array) {
        if (event.length === 0) {
          value = '';
        }
      }
      this.props.handlerInputSearch(HeaderBtn.nameInputSearch(this.props.element), {
        value: value.target ? value.target.value : value.value || value,
        search: this.props.element.input
      });
    }
  }, {
    key: 'makeInput',
    value: function makeInput() {
      var inputSearch = this.props.tableState.inputSearch;
      var inputPlaceholder = this.props.element.inputPlaceholder;
      var title = this.props.element.title;
      var placeholder = inputPlaceholder || _es2.default.placeholder + ' ' + title;
      this.props.element.placeholder = placeholder;

      var val = inputSearch[this.props.element.name] || {
        value: '',
        search: this.props.element.input
      };
      var className = this.props.element.inputClassName || 'form-control';
      this.props.element.inputClassName = className;
      var input = inputSearch ? _react2.default.createElement('input', {
        value: val.value,
        onChange: this.handlerChangeInput,
        placeholder: placeholder,
        className: this.props.element.inputClassName
      }) : undefined;
      var element = this.props.element;
      var component = element.componentInput ? element.componentInput(this.handlerChangeInput, element, val.value) : input;
      return component;
    }
  }, {
    key: 'render',
    value: function render() {
      var button = this.props.element.ordering !== false ? _react2.default.createElement(
        'button',
        { className: this.makeClassName(), onClick: this.update },
        this.props.element.title
      ) : _react2.default.createElement(
        'span',
        { className: 'table2-btn-ordering-disabled' },
        this.props.element.title
      );
      var inputSearch = this.props.element.input ? this.makeInput() : undefined;
      return _react2.default.createElement(
        'div',
        null,
        button,
        _react2.default.createElement(
          'div',
          { className: 'table2-input-search-container' },
          inputSearch
        )
      );
    }
  }]);

  return HeaderBtn;
}(_react.Component);

HeaderBtn.propTypes = {
  handlerInputSearch: _propTypes2.default.func,
  updateState: _propTypes2.default.func,
  element: _propTypes2.default.object,
  tableState: _propTypes2.default.object
};

exports.default = HeaderBtn;
module.exports = exports['default'];