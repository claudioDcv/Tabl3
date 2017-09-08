import React from 'react';
import { mount } from 'enzyme';

import TFooter from '../TFooter';
import conector from '../conector/ajax';
import removeParamFromQS from '../core/removeParamFromQS';

jest.mock('../conector/ajax');

 const props = {
   updateState: e => {},
   extract: true,
   tableState: {
     config: {
       table: {
         thead: {
         },
       },
       columnsAction: e => { console.log(e);},
       paginator: {
         style: {},
       },
     },
     columns: [{
       id: 1,
     }],
     paginator: {
       pages: 0,
     },
   },

 }
describe("TFooter ", function () {
  test('create TFooter', () => {
    mount(
      <TFooter {...props} />
   )
  });
});
