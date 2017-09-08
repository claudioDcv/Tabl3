'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _NextBtn = require('../NextBtn.jsx');

var _NextBtn2 = _interopRequireDefault(_NextBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("NextBtn", function () {
  test('create table-2-new-next-btn', function () {
    var props = {
      tableState: {
        paginator: {
          lastPage: false
        }
      },
      updateState: function updateState() {}
    };
    var component = (0, _enzyme.mount)(_react2.default.createElement(_NextBtn2.default, props));
    component.find('a').simulate('click');
    expect(component.children().children().props().className).toEqual('table-2-new-next-btn');
  });
});

describe("NextBtn last", function () {
  test('create table-2-new-next-btn', function () {
    var props = {
      tableState: {
        paginator: {
          lastPage: true
        }
      },
      updateState: function updateState() {}
    };
    var component = (0, _enzyme.mount)(_react2.default.createElement(_NextBtn2.default, props));
    expect(component.children().children().props().className).toEqual('table-2-new-next-btn');
  });
});