import React from 'react';
import { mount } from 'enzyme';

import Tabl3 from '../index';
import conector from '../conector/ajax';
import removeParamFromQS from '../core/removeParamFromQS';

jest.mock('../conector/ajax');

describe("removeParamFromQS [http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a]", function () {
  test('remove limit', () => {
    expect(removeParamFromQS('name__icontains', 'http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a')).toEqual('http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name');
  });
  test('remove limit false', () => {
    expect(removeParamFromQS('name__', 'http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a')).toEqual('http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a');
  });
});

let component = {};
let table2new = {};

describe("Tabl3 GET [http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a]", function () {
  test('create Table & asign className', () => {
    component2 = mount(
      <Tabl3
        config={{
          ajax: {
            url: 'http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a',
            method: 'GET',
            liveHeaders: () => {
              return {
                Authorization: 'JWT 298KJHkj1KJH',
              };
            },
          },
          conector: conector,
          debug: {
            inputSearch: true,
            paginator: true,
            initiaAjax: true,
            dataset: true,
          },
          onBeforeSend: e => ((e) => { }),
          onAfterSend: e => ((e) => { }),
          onAfterRender: e => { },
          errors: {
            onAjaxError: e => ((e) => { /* console.log(arguments);*/ }),
          },
          extraThead: paginator => (<button onClick={() => { console.log(paginator); }}>a</button>),
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
                isEmpty: 'bla',
                style: { color: 'red' },
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
              title: 'Nombre',
              name: 'name',
              textEmpty: 'Sin deatlle',
              inputPlaceholder: 'Buscar',
              input: 'name__icontains',
            },
            {
              title: 'Nombre',
              name: 'noexist',
              textEmpty: 'Sin deatlle',
              inputPlaceholder: 'Buscar',
              input: 'name__icontains',
            },
            /* end fake columns */
          ],
        }}/>
    );
    table2new2 = component2;
    expect(table2new2.find('table').props().className).toEqual('table-2-new table table-hover table-condensed');
    const table2new2Instance = component2.instance();
    table2new2Instance.updateState('PAGINATOR_GOTO_PAGE', 1)
    table2new2Instance.updateState('PAGINATOR_PREV_PAGE')
    table2new2Instance.updateState('PAGINATOR_NEXT_PAGE')
    table2new2Instance.updateState('RESULTS_ORDERING', 'name')
    table2new2Instance.resetToInitialState()
    //table2new2Instance.compareOrderingParam('-name')
    //table2new2Instance.compareOrderingParam('name')
  });
  test('create Table & asign className without columns', () => {
    component2 = mount(
      <Tabl3
        config={{
          ajax: {
            url: 'http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a',
            method: 'GET',
            liveHeaders: () => {
              return {
                Authorization: 'JWT 298KJHkj1KJH',
              };
            },
          },
          conector: conector,
          debug: {
            inputSearch: true,
            paginator: true,
            initiaAjax: true,
            dataset: true,
          },
          onBeforeSend: e => ((e) => { }),
          onAfterSend: e => ((e) => { }),
          onAfterRender: e => { },
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
                isEmpty: 'bla',
                style: { color: 'red' },
                component: instance => (<button>{instance.id}</button>),
              },
            },
          },
          testCol: true,
          paginator: {
            prevLink: 3,
            nextLink: 3,
          },
        }}/>
    );
    table2new2 = component2;
    //table2new2Instance.compareOrderingParam('-name')
    //table2new2Instance.compareOrderingParam('name')
  });
});

describe("Tabl3 GET [http://127.0.0.1:8000/colors/?limit=4]", function () {
  test('create Table & asign className', () => {
    component = mount(
      <Tabl3
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
          conector: conector,
          debug: {
            inputSearch: true,
            paginator: true,
            initiaAjax: true,
            dataset: true,
          },
          onBeforeSend: e => ((e) => { }),
          onAfterSend: e => ((e) => { }),
          errors: {
            onAjaxError: e => ((e) => { /* console.log(arguments);*/ }),
          },
          table: {
            className: 'table table-hover table-condensed',
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
              name: 'idd',
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


  test('create Table & no input', () => {
    component = mount(
      <Tabl3
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
          conector: conector,
          debug: {
            inputSearch: true,
            paginator: true,
            initiaAjax: true,
            dataset: true,
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
            },
            {
              title: 'Nombre',
              name: 'name',
              textEmpty: 'Sin deatlle',
            },
            /* end fake columns */
          ],
        }}/>
    );
    table2new = component;
    expect(table2new.find('table').props().className).toEqual('table-2-new table table-hover table-condensed');
  });

  test('state.config.ajax.url === http://127.0.0.1:8000/colors/?limit=4', () => {
    expect(table2new.props().config.paginator.nextLink).toEqual(3);
    expect(table2new.props().config.paginator.prevLink).toEqual(3);
    expect(table2new.props().config.ajax.url).toEqual('http://127.0.0.1:8000/colors/?limit=4');
  });

  test('create paginator <ul>', () => {
    expect(table2new.find('ul').length).toEqual(1);
  });
  test('test create paginator by service mock (6 link)', () => {
    expect(table2new.find('ul').children().length).toEqual(6);
  });
  test('test create td in tbody (12 = 4 objects x3 columns)', () => {
    expect(table2new.find('tbody').find('td').length).toEqual(12);
    expect(table2new.find('tbody').find('tr').children().length).toEqual(12);
  });
  test('test create header (3 th)', () => {
    expect(table2new.find('th').length).toEqual(3);
  });
  test('count total: 13', () => {
    const instanceTable = table2new.instance();
    expect(instanceTable.state.paginator.count).toEqual(13);
  });
});

let component2 = {};
let table2new2 = {};

describe("Tabl3 GET [http://127.0.0.1:8000/colors/?limit=4]", function () {
  test('create Table & click paginator', () => {
    component2 = mount(
      <Tabl3
        config={{
          ajax: {
            url: 'http://127.0.0.1:8000/colors/?limit=4',
            method: 'GET',
            simulateError: true,
            liveHeaders: () => {
              return {
                Authorization: 'JWT 298KJHkj1KJH',
              };
            },
          },
          conector: conector,
          debug: {
            inputSearch: true,
            paginator: true,
            initiaAjax: true,
            dataset: true,
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
    const table2new2Instance = component2.instance();
    table2new2Instance.updateState('PAGINATOR_GOTO_PAGE', 1)
    table2new2Instance.updateQueryStringOut((p) => {
      return {
        offset: 0,
      }
    }, false);
    table2new2Instance.updateQueryStringOut((p) => {
      return {
        offset: 0,
      }
    }, true);

    });
});

describe("Tabl3 Generate Error", function () {
  test('error', () => {
    const tableError = mount(
      <Tabl3 config={{
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
            title: 'Nombre',
            name: 'name',
            textEmpty: 'Sin deatlle',
            inputPlaceholder: 'Buscar',
            input: 'name__icontains',
          },
          /* end fake columns */
        ],
      }}/>);
      const instanceTableError = tableError.instance();
    expect(instanceTableError.initError).toEqual(true);
  });
});


describe("Tabl3 onAjaxError", function () {


  const inputTest = (handlerChangeInput, instance, value) => {
    const hdc = handlerChangeInput;
    return (
      <input value={value} onChange={hdc} />
    )
  };
  test('render custom imput', () => {
    const tableError = mount(
      <Tabl3 config={{
        ajax: {
          url: 'http://127.0.0.1:8000/colors/?limit=4',
          method: 'GET',
          simulateError: true,
          liveHeaders: () => {
            return {
              Authorization: 'JWT 298KJHkj1KJH',
            };
          },
        },
        conector: conector,
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
        onAjaxError: e => ((e) => { }),
        paginator: {
          prevLink: 3,
          nextLink: 3,
        },
        columns: [
          {
            title: 'Nombre',
            name: 'name',
            textEmpty: 'Sin deatlle',
            inputPlaceholder: 'Buscar',
            input: 'name__icontains',
            componentInput: inputTest,
          },
          /* end fake columns */
        ],
      }}/>);
      const instanceTableError = tableError.instance();
    expect(instanceTableError.initError).toEqual(false);
  });
});
