'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TFooter = require('../TFooter');

var _TFooter2 = _interopRequireDefault(_TFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../conector/ajax');

var props = {
  updateState: function updateState(e) {},
  extract: true,
  tableState: {
    config: {
      table: {
        thead: {}
      },
      columnsAction: function columnsAction(e) {
        console.log(e);
      },
      paginator: {
        style: {}
      }
    },
    columns: [{
      id: 1
    }],
    paginator: {
      pages: 0
    }
  }

};
describe("TFooter ", function () {
  test('create TFooter', function () {
    (0, _enzyme.mount)(_react2.default.createElement(_TFooter2.default, props));
  });
});