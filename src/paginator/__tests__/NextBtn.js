import React from 'react';
import { mount } from 'enzyme';
import NextBtn from '../NextBtn.jsx';
import PrevBtn from '../PrevBtn.jsx';

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
    expect(component.children().children().props().className).toEqual('table-2-new-next-btn');
  });
});

describe("PrevBtn", function () {
  test('create table-2-new-next-btn', () => {
    const props = {
      tableState: {
        paginator: {
          firstPage: false,
        },
      },
      updateState: () => {},
    }
    const component = mount(<PrevBtn {...props} />);
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
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

describe("PrevBtn firstPage", function () {
  test('create table-2-new-next-btn', () => {
    const props = {
      tableState: {
        paginator: {
          firstPage: true,
        },
      },
      updateState: () => {},
    }
    const component = mount(<PrevBtn {...props} />);
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
  });
});
