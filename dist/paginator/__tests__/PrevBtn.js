'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _PrevBtn = require('../PrevBtn.jsx');

var _PrevBtn2 = _interopRequireDefault(_PrevBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("PrevBtn", function () {
  test('create table-2-new-prev-btn and simulate click', function () {
    var props = {
      tableState: {
        paginator: {
          lastPage: false
        }
      },
      updateState: function updateState() {}
    };
    var component = (0, _enzyme.mount)(_react2.default.createElement(_PrevBtn2.default, props));
    component.find('a').simulate('click');
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
  });
});

describe("PrevBtn last", function () {
  test('create table-2-new-prev-btn and simulate click', function () {
    var props = {
      tableState: {
        paginator: {
          lastPage: true
        }
      },
      updateState: function updateState() {}
    };
    var component = (0, _enzyme.mount)(_react2.default.createElement(_PrevBtn2.default, props));
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
  });
});