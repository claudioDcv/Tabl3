'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _THead = require('./THead');

var _THead2 = _interopRequireDefault(_THead);

var _TBody = require('./TBody');

var _TBody2 = _interopRequireDefault(_TBody);

var _TFooter = require('./TFooter');

var _TFooter2 = _interopRequireDefault(_TFooter);

var _const = require('./core/const');

var _core = require('./core/core');

var _errorReport = require('./errorReport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabl3 = function (_Component) {
  _inherits(Tabl3, _Component);

  _createClass(Tabl3, null, [{
    key: 'formatJSON',
    value: function formatJSON(st, val) {
      return _react2.default.createElement(
        'pre',
        { style: { textAlign: 'left' } },
        JSON.stringify(st[val], undefined, 4)
      );
    }
  }]);

  function Tabl3(props) {
    _classCallCheck(this, Tabl3);

    var _this = _possibleConstructorReturn(this, (Tabl3.__proto__ || Object.getPrototypeOf(Tabl3)).call(this, props));

    var prs = props;
    _this.name = 'Tabl3';
    _this.version = 'v1.1.28';
    _this.initError = false;
    _this.state = {
      initiaAjax: _extends({}, prs.config.ajax),
      config: prs.config,
      dataset: {
        results: []
      },
      columns: prs.config.columns,
      paginator: {},
      inputSearch: {},
      ajaxError: false
    };
    _this.updateState = _this.updateState.bind(_this);
    _this.ajaxGotoPage = _this.ajaxGotoPage.bind(_this);
    _this.initialState = _this.initialState.bind(_this);
    _this.updateQueryStringOut = _this.updateQueryStringOut.bind(_this);
    _this.handlerInputSearch = _this.handlerInputSearch.bind(_this);
    _this.resetToInitialState = _this.resetToInitialState.bind(_this);
    _this.paginator = _this.paginator.bind(_this);
    return _this;
  }

  _createClass(Tabl3, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if ((0, _errorReport.errorInitialTable)(this, this.props)) {
        this.init();
        this.handlerOnRender();
      } else {
        this.initError = true;
      }
    }
  }, {
    key: 'setStateService',
    value: function setStateService(dataset, response, opt) {
      this.setState({
        dataset: dataset,
        paginator: (0, _core.makePaginator)(dataset, opt, this.props.config.paramsConection)
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handlerOnRender();
    }
  }, {
    key: 'handlerOnRender',
    value: function handlerOnRender() {
      if (this.state.config.onAfterRender) {
        if (typeof this.state.config.onAfterRender === 'function') {
          this.state.config.onAfterRender(this.state.paginator);
        }
      }
    }
  }, {
    key: 'updateState',
    value: function updateState(key, val) {
      var data = this.state;
      switch (key) {
        case _const.PAGINATOR_GOTO_PAGE:
          this.ajaxGotoPage(val);
          break;
        case _const.PAGINATOR_PREV_PAGE:
          this.ajaxExec(this.state.paginator.prev);
          break;
        case _const.PAGINATOR_NEXT_PAGE:
          this.ajaxExec(this.state.paginator.next);
          break;
        case _const.RESULTS_ORDERING:
          this.ajaxExec(this.compareOrderingParam(val));
          break;
        default:
          data[key] = val;
          this.setState(data);
          this.ajax();
      }
    }
  }, {
    key: 'updateQueryStringOut',
    value: function updateQueryStringOut(cb, resetInputSearch) {
      var _this2 = this;

      var url = this.state.initiaAjax.url;
      if (typeof cb === 'function') {
        var o = cb(this.state.paginator);
        if (o) {
          Object.keys(o).forEach(function (v) {
            if (Object.prototype.hasOwnProperty.call(o, v)) {
              if (o[v]) {
                url = (0, _core.updateOrCreateParamFromQS)(url, v, o[v]);
              }
            }
          });
        }
      }
      if (resetInputSearch) {
        this.setState({ inputSearch: {} });
      } else {
        var _o = this.state.inputSearch;
        Object.keys(_o).forEach(function (v) {
          if (Object.prototype.hasOwnProperty.call(_o, v)) {
            if (_o[v].value) {
              url = (0, _core.updateOrCreateParamFromQS)(url, _o[v].search, _o[v].value);
            }
          }
        });
      }
      this.ajaxConector({
        url: url,
        method: this.state.initiaAjax.method
      }, function (dataset, response, opt) {
        _this2.setStateService(dataset, response, opt);
      });
    }
  }, {
    key: 'compareOrderingParam',
    value: function compareOrderingParam(val) {
      var url = this.state.paginator.actual;
      var o = this.state.inputSearch;
      var param = '';

      if (this.state.paginator.orderingMode === '-') {
        param = val;
      } else {
        param = '-' + val;
      }
      var urlCreate = (0, _core.updateOrCreateParamFromQS)(url, 'ordering', param);

      Object.keys(o).forEach(function (v) {
        if (Object.prototype.hasOwnProperty.call(o, v)) {
          if (o[v].value) {
            urlCreate = (0, _core.updateOrCreateParamFromQS)(urlCreate, o[v].search, o[v].value);
          }
        }
      });

      return urlCreate;
    }
  }, {
    key: 'ajax',
    value: function ajax() {
      var _this3 = this;

      var cbResponse = function cbResponse(dataset, response, opt) {
        _this3.setStateService(dataset, response, opt);
      };
      this.ajaxConector(this.state.config.ajax, cbResponse);
    }
  }, {
    key: 'ajaxConector',
    value: function ajaxConector(configArg, cb) {
      var _this4 = this;

      var c = this.state.config;

      var prs = this.props;
      var config = configArg;
      var confAjax = prs.config.ajax;
      var headers = confAjax.liveHeaders ? confAjax.liveHeaders() : {};
      if (this.state.config.onBeforeSend) {
        this.state.config.onBeforeSend(config);
      }

      var ecb = function ecb(e) {
        _this4.setState({ ajaxError: true }, function () {
          if (_this4.state.config.errors) {
            if (_this4.state.config.errors.onAjaxError) {
              _this4.state.config.errors.onAjaxError(e);
            } else {
              console.error(e);
            }
          }
        });
      };
      var nonErrorAjax = function nonErrorAjax() {
        _this4.setState({ ajaxError: false });
      };
      var cbAfterData = function cbAfterData(response) {
        if (_this4.state.config.onAfterSend) {
          _this4.state.config.onAfterSend(response.data);
        }
      };
      config.headers = _extends({}, config.headers, headers);
      if (c.connector && c.connector instanceof Function) {
        this.state.config.conector(config, cb, ecb, nonErrorAjax, cbAfterData);
      } else if (c.conector && c.conector instanceof Function) {
        // remove in future release
        console.warn('conector is deprecated, change name to [connector]');
        c.conector(config, cb, ecb, nonErrorAjax, cbAfterData);
      }
    }
  }, {
    key: 'ajaxExec',
    value: function ajaxExec(url) {
      var _this5 = this;

      var method = this.state.initiaAjax.method;
      this.ajaxConector({ method: method, url: url }, function (dataset, response, opt) {
        _this5.setStateService(dataset, response, opt);
      });
    }
  }, {
    key: 'handlerInputSearch',
    value: function handlerInputSearch(key, value) {
      var i = this.state.inputSearch;
      i[key] = value;
      this.setState({ inputSearch: i });

      if (this.state.inputSearch && this.state.paginator.actual) {
        var url = this.state.paginator.actual;
        var o = this.state.inputSearch;
        Object.keys(o).forEach(function (v) {
          if (Object.prototype.hasOwnProperty.call(o, v)) {
            if (o[v].value) {
              console.log(o[v]);
              if (o[v].search instanceof Array && typeof o[v].value === 'string') {
                o[v].search.forEach(function (e) {
                  url = (0, _core.updateOrCreateParamFromQS)(url, e, o[v].value);
                });
              }
              if (o[v].search instanceof Array && o[v].value instanceof Array) {
                o[v].search.forEach(function (e, i) {
                  url = (0, _core.updateOrCreateParamFromQS)(url, e, o[v].value[i]);
                });
              } else {
                url = (0, _core.updateOrCreateParamFromQS)(url, o[v].search, o[v].value);
              }
            } else {
              console.log(o[v]);
              if (o[v].search instanceof Array) {
                o[v].search.forEach(function (e) {
                  url = (0, _core.removeParamFromQS)(e, url);
                });
              } else {
                url = (0, _core.removeParamFromQS)(o[v].search, url);
              }
            }
          }
        });
        // }
        url = (0, _core.updateOrCreateParamFromQS)(url, 'offset', 0);
        this.ajaxExec(url);
      }
    }
  }, {
    key: 'resetToInitialState',
    value: function resetToInitialState() {
      if (typeof this.state.config.table.resetButton.onReset === 'function') {
        this.state.config.table.resetButton.onReset();
      }
      this.initialState();
    }
  }, {
    key: 'initialState',
    value: function initialState() {
      var _this6 = this;

      var initiaAjax = this.state.initiaAjax;
      this.setState({ inputSearch: {} });
      this.ajaxConector(initiaAjax, function (dataset, response, opt) {
        _this6.setStateService(dataset, response, opt);
      });
    }
  }, {
    key: 'ajaxGotoPage',
    value: function ajaxGotoPage(nPage) {
      var _this7 = this;

      var configAjax = this.state.config.ajax;
      var url = this.state.paginator.actual;
      url = (0, _core.updateOrCreateParamFromQS)(url, 'offset', this.state.paginator.limit * (nPage - 1));
      configAjax.url = (0, _core.updateOrCreateParamFromQS)(url, 'limit', this.state.paginator.limit);
      this.ajaxConector(configAjax, function (dataset, response, opt) {
        _this7.setStateService(dataset, response, opt);
      });
    }
  }, {
    key: 'init',
    value: function init() {
      this.ajax();
    }
  }, {
    key: 'paginator',
    value: function paginator() {
      var st = this.state;
      return _react2.default.createElement(_TFooter2.default, { tableState: st, updateState: this.updateState, extract: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var st = this.state;
      var debug = st.config.debug;
      if (st.ajaxError) {
        return _react2.default.createElement('div', null);
      }
      if (!this.state.columns) {
        return _react2.default.createElement('span', null);
      }
      return _react2.default.createElement(
        'div',
        { className: 'tabl3' },
        _react2.default.createElement(
          'div',
          { className: st.config.table.responsive ? 'table-responsive' : '' },
          _react2.default.createElement(
            'table',
            { className: 'table-2-new ' + st.config.table.className },
            _react2.default.createElement(_THead2.default, {
              initialState: this.initialState,
              tableState: st,
              updateState: this.updateState,
              handlerInputSearch: this.handlerInputSearch,
              resetToInitialState: this.resetToInitialState
            }),
            _react2.default.createElement(_TBody2.default, { tableState: st, updateState: this.updateState })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'table-paginator' },
          (st.config.paginator || {}).hidden ? undefined : _react2.default.createElement(_TFooter2.default, { tableState: st, updateState: this.updateState })
        ),
        this.state.config.debug ? _react2.default.createElement(
          'div',
          null,
          debug.inputSearch ? Tabl3.formatJSON(st, 'inputSearch') : undefined,
          debug.initiaAjax ? Tabl3.formatJSON(st, 'initiaAjax') : undefined,
          debug.paginator ? Tabl3.formatJSON(st, 'paginator') : undefined,
          debug.dataset ? Tabl3.formatJSON(st, 'dataset') : undefined
        ) : null
      );
    }
  }]);

  return Tabl3;
}(_react.Component);

Tabl3.propTypes = {
  config: _propTypes2.default.object
};

exports.default = Tabl3;
module.exports = exports['default'];