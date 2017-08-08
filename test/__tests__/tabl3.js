import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
jest.mock('../conector/ajax');

/* Component to Test */
import Table2New from '../Index.jsx';

import conectorMock from '../conector/ajax';

const randomInt = (init, end) => Math.floor((Math.random() * end) + init);

let component = {};
let table2new = {};

describe("Table2New GET [http://127.0.0.1:8000/colors/?limit=4]", function () {
  test('create Table & asign className', () => {
    component = mount(
      <Table2New
        config={{
          ajax: {
            url: 'http://127.0.0.1:8000/colors/?limit=4',
            method: 'GET',
            liveHeaders: () => {
              return {
                Authorization: 'JWT 298KJHkj1KJH',
              };
            },
          },
          conector: conectorMock,
          debug: {
            inputSearch: false,
            paginator: false,
            initiaAjax: false,
            dataset: false,
          },
          onBeforeSend: e => ((e) => { }),
          onAfterSend: e => ((e) => { }),
          errors: {
            onAjaxError: e => ((e) => { /* console.log(arguments);*/ }),
          },
          table: {
            className: 'table table-hover table-condensed',
            resetButton: {
              className: 'btn btn-sm btn-warning',
              title: 'Restablecer',
              onReset: e => ((e) => { }),
            },
            thead: {
              className: '',
              actions: {
                className: '',
                cssTH: {
                  width: '130px',
                  minWidth: '130px',
                },
                component: instance => (<button>{instance.id}</button>),
              },
            },
          },
          paginator: {
            prevLink: 3,
            nextLink: 3,
          },
          columns: [
            {
              title: 'Id',
              name: 'id',
              textEmpty: 'Sin nombre',
              cssTH: {
                width: '250px',
                minWidth: '250px',
              },
              input: 'id',
              inputPlaceholder: 'Ingrese nemotécnico a buscar',
              inputClassName: 'form-control',
            },
            {
              title: 'Nombre',
              name: 'name',
              textEmpty: 'Sin deatlle',
              inputPlaceholder: 'Buscar',
              input: 'name__icontains',
            },
            /* end fake columns */
          ],
        }}/>
    );
    table2new = component;
    expect(table2new.find('table').props().className).toEqual('table-2-new table table-hover table-condensed');
  });
  test('create paginator <ul>', () => {
    // console.log(table2new.find('ul'));
    expect(table2new.find('ul').length).toEqual(1);
  });

  test('test create paginator by service mock (6 link)', () => {
    expect(table2new.find('ul').children().length).toEqual(6);
  });

  test('count total: 13', () => {
    const instanceTable = table2new.instance();
    //console.log(table2new.props());
    //console.log('>>', table2new.find('table').find('TFooter').props().tableStat);
    //console.log('>>', table2new.find('table').find('TFooter').props().tableState.paginator);

    //console.log(instanceTable.state);

    //table2new.find('.next-link').simulate('click');

    //console.log('>>', table2new.find('table').find('TFooter').props().tableState.paginator);
    //console.log('>>', table2new.find('table').find('TFooter').props().tableState);
    expect(instanceTable.state.paginator.count).toEqual(13);
  });



});
//RUT test
