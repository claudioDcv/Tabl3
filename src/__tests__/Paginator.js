import React from 'react';
import { mount } from 'enzyme';

import Paginator from '../Paginator';

jest.mock('../conector/ajax');

 const props = {
   updateState: e => {},
   tableState: {
     config: {
       columnsAction: e => { console.log(e);},
     },
     columns: [{
       id: 1,
     }],
     paginator: {
       current: 2,
     },
   },
 }
describe("Paginator ", function () {
  test('create Paginator', () => {
  const component =  mount(
      <Paginator {...props} />
   )
   const tableInstance = component.instance();
   tableInstance.update('k', 'v')
  });
});
