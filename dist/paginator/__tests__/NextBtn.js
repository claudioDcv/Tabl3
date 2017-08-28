'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _NextBtn = require('../NextBtn.jsx');

var _NextBtn2 = _interopRequireDefault(_NextBtn);

var _PrevBtn = require('../PrevBtn.jsx');

var _PrevBtn2 = _interopRequireDefault(_PrevBtn);

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
    expect(component.children().children().props().className).toEqual('table-2-new-next-btn');
  });
});

describe("PrevBtn", function () {
  test('create table-2-new-next-btn', function () {
    var props = {
      tableState: {
        paginator: {
          firstPage: false
        }
      },
      updateState: function updateState() {}
    };
    var component = (0, _enzyme.mount)(_react2.default.createElement(_PrevBtn2.default, props));
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
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

describe("PrevBtn firstPage", function () {
  test('create table-2-new-next-btn', function () {
    var props = {
      tableState: {
        paginator: {
          firstPage: true
        }
      },
      updateState: function updateState() {}
    };
    var component = (0, _enzyme.mount)(_react2.default.createElement(_PrevBtn2.default, props));
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
  });
});