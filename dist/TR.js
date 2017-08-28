'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require('./core/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-console: 0 */


var TR = function (_Component) {
  _inherits(TR, _Component);

  _createClass(TR, null, [{
    key: 'TD',
    value: function TD(o, col, key) {
      var object = col.isEmpty || col.textEmpty;
      try {
        object = (0, _core.dotNotationToObject)(o, col.name);
      } catch (e) {
        console.warn('atribute (' + col.name + '), non exist', e.toString());
      }
      console.log(object);
      if (object === 'undefined' || object === '') {
        console.warn('atribute (' + col.name + '), is undefined');
        object = col.isEmpty || col.textEmpty;
      }
      return _react2.default.createElement(
        'td',
        { key: (0, _core.makeKey)(key) },
        object
      );
    }
  }]);

  function TR(props) {
    _classCallCheck(this, TR);

    var _this = _possibleConstructorReturn(this, (TR.__proto__ || Object.getPrototypeOf(TR)).call(this, props));

    _this.update = _this.update.bind(_this);
    _this.TDS = _this.TDS.bind(_this);
    return _this;
  }

  _createClass(TR, [{
    key: 'update',
    value: function update() {
      var val = 'hi';
      this.props.updateState('now', val);
    }
  }, {
    key: 'componentAction',
    value: function componentAction(o) {
      var actions = this.props.tableState.config.table.thead.actions;
      if (actions.component) {
        return actions.component(o);
      }
      return undefined;
    }
  }, {
    key: 'TDS',
    value: function TDS() {
      var st = this.props.tableState;
      var o = this.props;
      var td = function td(col, key) {
        if (col.component) {
          return _react2.default.createElement(
            'td',
            { style: col.style, key: (0, _core.makeKey)(key) },
            col.component(o.element, col, key)
          );
        }
        return TR.TD(o.element, col, key);
      };
      return _react2.default.createElement(
        'tr',
        null,
        st.columns.map(function (col, key) {
          return td(col, key);
        }),
        st.config.table.thead.actions ? _react2.default.createElement(
          'td',
          { key: 'actions' },
          this.componentAction(o.element)
        ) : undefined
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.TDS();
    }
  }]);

  return TR;
}(_react.Component);

TR.propTypes = {
  updateState: _propTypes2.default.func,
  tableState: _propTypes2.default.object
};

exports.default = TR;
module.exports = exports['default'];