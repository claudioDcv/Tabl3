import React from 'react';
import { mount } from 'enzyme';

import TR from '../TR';
import conector from '../conector/ajax';
import removeParamFromQS from '../core/removeParamFromQS';

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
   },
 }
describe("TR ", function () {
  test('create TR', () => {
    mount(
      <table><tbody><TR {...props} /></tbody></table>
   )
  });
});
