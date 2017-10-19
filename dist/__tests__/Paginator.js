'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Paginator = require('../Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../conector/ajax');

var props = {
  updateState: function updateState(e) {},
  tableState: {
    config: {
      columnsAction: function columnsAction(e) {
        console.log(e);
      }
    },
    columns: [{
      id: 1
    }],
    paginator: {
      current: 2
    }
  }
};
describe("Paginator ", function () {
  test('create Paginator', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_Paginator2.default, props));
    var tableInstance = component.instance();
    tableInstance.update('k', 'v');
  });
});