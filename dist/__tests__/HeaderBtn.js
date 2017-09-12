'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _HeaderBtn = require('../HeaderBtn');

var _HeaderBtn2 = _interopRequireDefault(_HeaderBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../conector/ajax');

var props = {
  handlerInputSearch: function handlerInputSearch(e) {},
  updateState: function updateState(e) {},
  element: {
    name: 'name',
    ordering: 'name',
    orderingBy: 'name'
  },
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
      orderingBy: 'name'
    }
  }
};
describe("HeaderBtn ", function () {
  test('create HeaderBtn', function () {
    (0, _enzyme.mount)(_react2.default.createElement(_HeaderBtn2.default, props));
  });
});