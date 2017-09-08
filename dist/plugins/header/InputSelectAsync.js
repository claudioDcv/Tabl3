'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

require('react-select/dist/react-select.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* EXAMPLE
{
  title: 'Zona',
  name: 'zone.name',
  ordering: 'zone',
  cssTH: {
    width: '230px',
    minWidth: '230px',
  },
  component: instance => (
    <span>
      <div className={`colour colour-${instance.zone.colour}`}>
        {`${instance.zone.natural_key} `}
      </div> {instance.zone.name}
    </span>
  ),
  componentInput: TableSelect,
  input: 'zone',
  inputChangeToggleSelect: {
    id: 'table-pmtdi',
    minHeight: '350px',
  },
  inputProps: {
    className: 'menu-outer-top',
    optionRenderer: e => (
      <div className="colour-select-tag">
        <div className={`colour-inline colour-${e.colour}`}>
          {`${e.natural_key} `}
        </div> {e.name}
      </div>
    ),
  },
  // API.listZoneSkipPagination() (this function return axios promise)
  getData: (input, callback) => {
    const list = () => API.listZoneSkipPagination().then(e => e.data.map(i => ({
      ...i,
      label: i.name,
      value: i.id,
    })));
    list()
      .then(e => callback(null, { options: e, complete: true }))
      .catch(() => callback(null, { options: [], complete: true }));
  },
*/

var select = function select(handlerChangeInput, instance, value) {
  return _react2.default.createElement(_reactSelect2.default.Async, _extends({}, instance.inputProps, {
    onFocus: function onFocus() {
      if (instance.inputChangeToggle) {
        var elm = document.getElementById(instance.inputChangeToggle.id);
        elm.style.minHeight = instance.inputChangeToggle.minHeight;
      }
    },
    openOnFocus: true,
    onOpen: function onOpen() {
      if (instance.inputChangeToggle) {
        var elm = document.getElementById(instance.inputChangeToggle.id);
        elm.style.minHeight = instance.inputChangeToggle.minHeight;
      }
    },
    onClose: function onClose() {
      if (instance.inputChangeToggle) {
        var elm = document.getElementById(instance.inputChangeToggle.id);
        elm.style.minHeight = 'auto';
      }
    },
    name: instance.name,
    placeholder: instance.placeholder,
    value: value,
    loadOptions: instance.getData,
    onChange: handlerChangeInput
  }));
};

exports.default = select;
module.exports = exports['default'];