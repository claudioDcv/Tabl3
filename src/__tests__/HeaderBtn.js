import React from 'react';
import { mount } from 'enzyme';

import HeaderBtn from '../HeaderBtn';

jest.mock('../conector/ajax');

 const props = {
   handlerInputSearch: e => {},
   updateState: e => {},
   element: {
     name: 'name',
     ordering: 'name',
     orderingBy: 'name',
   },
   tableState: {
     config: {
       columnsAction: e => { console.log(e);},
     },
     columns: [{
       id: 1,
     }],
     paginator: {
       orderingBy: 'name',
     }
   },
 }
describe("HeaderBtn ", function () {
  test('create HeaderBtn', () => {
    mount(<HeaderBtn {...props} />)
  });
});
