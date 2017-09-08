import React from 'react';
import { mount } from 'enzyme';
import NextBtn from '../NextBtn.jsx';

describe("NextBtn", function () {
  test('create table-2-new-next-btn', () => {
    const props = {
      tableState: {
        paginator: {
          lastPage: false,
        },
      },
      updateState: () => {},
    }
    const component = mount(<NextBtn {...props} />);
    component.find('a').simulate('click')
    expect(component.children().children().props().className).toEqual('table-2-new-next-btn');
  });
});


describe("NextBtn last", function () {
  test('create table-2-new-next-btn', () => {
    const props = {
      tableState: {
        paginator: {
          lastPage: true,
        },
      },
      updateState: () => {},
    }
    const component = mount(<NextBtn {...props} />);
    expect(component.children().children().props().className).toEqual('table-2-new-next-btn');
  });
});
