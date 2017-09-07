import React from 'react';
import { mount } from 'enzyme';
import PrevBtn from '../PrevBtn.jsx';

describe("PrevBtn", function () {
  test('create table-2-new-prev-btn and simulate click', () => {
    const props = {
      tableState: {
        paginator: {
          lastPage: false,
        },
      },
      updateState: () => {},
    }
    const component = mount(<PrevBtn {...props} />);
    component.find('a').simulate('click')
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
  });
});



describe("PrevBtn last", function () {
  test('create table-2-new-prev-btn and simulate click', () => {
    const props = {
      tableState: {
        paginator: {
          lastPage: true,
        },
      },
      updateState: () => {},
    }
    const component = mount(<PrevBtn {...props} />);
    expect(component.children().children().props().className).toEqual('table-2-new-prev-btn');
  });
});
