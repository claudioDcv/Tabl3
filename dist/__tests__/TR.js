'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TR = require('../TR');

var _TR2 = _interopRequireDefault(_TR);

var _ajax = require('../conector/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _removeParamFromQS = require('../core/removeParamFromQS');

var _removeParamFromQS2 = _interopRequireDefault(_removeParamFromQS);

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
    }]
  }
};
describe("TR ", function () {
  test('create TR', function () {
    (0, _enzyme.mount)(_react2.default.createElement(
      'table',
      null,
      _react2.default.createElement(
        'tbody',
        null,
        _react2.default.createElement(_TR2.default, props)
      )
    ));
  });
});