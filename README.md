# Tabl3 React Server Side

[![Build Status](https://travis-ci.org/claudioDcv/Tabl3.svg?branch=master)](https://travis-ci.org/claudioDcv/Tabl3) [![codecov](https://codecov.io/gh/claudioDcv/Tabl3/branch/master/graph/badge.svg)](https://codecov.io/gh/claudioDcv/Tabl3) [![npm](https://img.shields.io/npm/v/tabl3.svg)](https://www.npmjs.com/package/tabl3) [![npm](https://img.shields.io/npm/l/tabl3.svg)](https://www.npmjs.com/package/tabl3) [![npm](https://img.shields.io/npm/dm/tabl3.svg)](https://www.npmjs.com/package/tabl3)

- [repo git](https://github.com/claudioDcv/Tabl3)
- [paquete npm](https://www.npmjs.com/package/tabl3)

- creado por [claudio.dcv@gmail.com](claudio.dcv@gmail.com)
- Si quieres colaborar, escribeme un correo.

- Tabla 100% server side creada en `React`
- Agnostica a cualquier libreria que maneje el estado como `Redux` o `Reflux`,
- Pensada para ser 100% compatible con `Django Rest Framework` pero no exclusiva, por tanto si el backend retorna un objeto `JSON` como el que requiere esta tabla, no existe problema para funcionar con otros lenguajes o framework
- extensible con `Plugins`
- Tabla sin dependencias, excepto los plugins creados que son de uso opcional


## Compilar proyecto

```bash
yarn install
```
```bash
yarn dist
```


## Inicialización

- solo se debe declarar la propiedad `config` que contiene todo el objecto `JSON` con las configuraciones y opciones

```javascript

render() {
  return (
    <Tabl3
      config={}
    />
  );
}
```

- ademas para hacer referencia a la tabla y utilizar el metodo `updateQueryStringOut` que actualiza parametros de la tabla se puede utilizar `ref={(e) => { this.table = e; }}`

```javascript

render() {
  return (
    <Table3
      ref={(e) => { this.table = e; }}
      config={}
    />
  );
}
```

## El importante Conector AJAX

- Simplemente es una funcion que se encarga de los llamados al api, centralizando todos los `request` en esta function

  ```javascript
  import axios from 'axios'

  const conector = (opt, callback, errorCallback, nonErrorAjax, onAfterSend) => {
    axios(opt).then(
      response => {
      	/* estas 3 funcionas se suelen ejecutar a la vez */
        nonErrorAjax()
        callback(response.data, response, opt)
        onAfterSend(response)
      },
      response => errorCallback(response)
    )
  }

  export default conector
  ```

##### Parametros que entrega la funcion callback del `conector`

- opt {object}: es el objeto declarado en `config.ajax`
- calback {function}: se deben paras 3 parametros
	- 1: la data de la respuesta (el siguiente apartado `Servicio` esplica bien lo que contiene `data`)

	```json
  {
      "count": 13,
      "results": [
          {
              "id": 1,
              "name": "Blanco",
              "natural_key": "blanco"
          },
      ]
  }
  ```
  - 2: response: en el caso de `axios` contiene toda la metadata adicional, como las cabeceras, es `status`

  - 3: opt: se retorna la configuración enviada al servicio, se puede manipular antes si hace falta, pero no se recomienda ya que podria afectar negativamente a la funcionalidad de la tabla.

- errorCallback: una funcion que recibe como unico parametro la respuesta `response` cuando ha ocurrido un error
- nonErorAjax: se ejecuta en caso de que no exista algun error con `ajax` se suele ejecutar en el caso de exito junto a `callback`
- onAfterSend: pasa un objeto que retornara la funcion callback que puede ser escuhada desde fuera de la tabla, se suele pasar `response` como unico argumento


## Servicio

- **request**: al menos se debe enviar dos parametros `http://127.0.0.1:8000/colors/?limit=4&offset=8`

  - `limit`: cantidad maxima de elementos retornador por el servicio en cada consulta
  - `offset`: desde que registro se estan retornado los elementos

    - 0 para retornar desde el primer registros
    - 4 para retornar desde el 5to hacia lo definido en `limit`

- **response**: es importante que el servicio consultado retorne el siguiente tipo de objecto `data`

  ```json
  {
      "count": 13,
      "results": [
          {
              "id": 1,
              "name": "Blanco",
              "natural_key": "blanco"
          },
          {
              "id": 2,
              "name": "Negro",
              "natural_key": "negro"
          },
          {
              "id": 3,
              "name": "Cafe",
              "natural_key": "cafe"
          },
          {
              "id": 4,
              "name": "Asabache",
              "natural_key": "asabache"
          }
      ]
  }
  ```

  - **count**: cantidad total de elementos que existen el la tabla en la base de datos, o almenos lo que el `query` construido en el `backend` desea mostrar como maximo

  - **results**: `array` de elementos que va a mostrar en la table, y que son los que desea mapear en `columns`

## Parametros de la tabla

```
table: {
  head: {
    actions: {
      title: 'titulo <th> acciones',
      className: '',
      style: {},
    }
  }
},
columns: [{
  th: {
    style: {},
  }
}]
```

### El primer indice de parametros del objeto contiene las siguiente propiedades

- ajax `{object}`: objecto donde se declara el servicio a consumir `API`

  ```javascript
  ajax: {
    url: 'api/colors/?query',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    liveHeaders: () => ({}),
  }
  ```

  - **url** `{string}`: ruta inicial del servicio, si se hace reset de la tabla, este sera el servicio con el que se reinicializara la tabla, tambien se puede agregar un recurso con parametros `host.com/api/v1/colors?limit=10&offset=0`

  - **method** `{string}`: metodo `HTTP` con el que se consume el servicio, ejemplo `GET`

  - **headers** `{objec} | opcional`: objecto con los header que se desean enviar el la cabecera de los `request`, ejemplo `'Content-Type': 'application/json',`

  - **liveHeaders** `{function} | return {object} | opcional`: existen ocasiones en que se desea enviar un parametro en header calculado y no estatico, ejemplo:

    ```javascript
    () => ({
      Authorization: `JWT ${TOKEN()}`,
    })
    ```

- debug `{object} | optional`: set de `keys` para activar vistas en pantalla que muestra en vivo como elementos de la tabla en vivo

  ```javascript
  debug: {
    initiaAjax: false,
    inputSearch: true,
    paginator: true,
    dataset: false,
  },
  ```

  - **initiaAjax** `{boolean} | optional`: activa el feedback del objecto `ajax` de el `head` de la tabla

  - **inputSearch** `{boolean} | optional`: activa el feedback de los elemetos input de el `head` de la tabla

  - **paginator** `{boolean} | optional`: activa el feedback del objecto `paginator` de el `footer` de la tabla

  - **dataset** `{boolean} | optional`: activa el feedback del objecto `dataset` que sera lo que retorna el servicio

- onBeforeSend `{function} | optional`: función `callback` que tiene como unico parametro la configuración que se envia como `request` al servicio

  ```javascript
  /*
  config: {
    url: 'api/colors/?query',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  */
  onBeforeSend: (config) => { console.log(config); },
  ```

- onAfterSend `{function} | optional`: función `callback` que tiene como unico parametro la respuesta que retorna el servicio

  ```javascript
  onAfterSend: (response) => { console.log(response); },
  ```

- table `{object}`: este objeto contiene los siguiente atributos

	- clasName `{string} | opcional` : clases css pasadas directamente al tag `<table>`
	- resetButton

- columns `{array}`

- paginator `{object}`



- `nuevo` onAfterRender `{function} | optional` : se ejecuta cada vez que termina el render de los trs

- `nuevo` extraThead `{function} | optional` : posibilita la opcion de agregar componentes en `thead` superior donde esta el botton reset

### el argumento `component` contiene otros atributos

1: el elemento en el row
2: los valores de la columna descritos en la definicion
3: el numero de columna (key) en ese momento

## Implementación

```javascript
import React from 'react';
import axios from 'axios';
import Tabl3 from '../../tabl3/tabl3';
import { InputSelectAsync } from '../../Table2New/plugins/index';

const baseUrl = 'http://127.0.0.1:8000';

const getData = (input, callback) => {
  const list = () => axios({
    url: `${baseUrl}/colors/?skip_pagination`,
    method: 'GET',
  }).then(e => e.data.map(i => ({ value: i.id, label: i.name })));
  list().then((e) => {
    callback(null, {
      options: e,
      complete: true,
    });
  });
};


export default () => (
  <div>
    <h1>About Us</h1>
    <p>Hello Medium!</p>
    <Tabl3
      ref={(e) => { this.table = e; }}
      config={{
        ajax: {
          url: `${baseUrl}/colors/`,
          method: 'GET',
          liveHeaders: () => ({}),
        },
        conector: conector,
        debug: {
          inputSearch: true,
          paginator: true,
          initiaAjax: false,
          dataset: true,
        },
        onBeforeSend: (e) => { console.log(e); },
        onAfterSend: (e) => { console.log(e); },
        table: {
          className: 'table table-hover table-sm',
          resetButton: {
            className: 'btn btn-danger',
            title: 'Reiniciar',
          },
          thead: {
            className: '',
            actions: {
              className: '',
              component: e => (<button onClick={() => {
                this.handlerAction(e.id);
              }}>{e.id}</button>),
            },
          },
        },
        paginator: {
          prevLink: 3,
          nextLink: 3,
        },
        columns: [
          {
            title: 'ID',
            name: 'id',
            textEmpty: 'Sin nombre',
            input: 'id',
            inputProps: {
              clearable: false,
            },
            getData,
            componentInput: InputSelectAsync,
          },
          {
            title: 'Nombre',
            name: 'name',
            textEmpty: 'Sin nombre',
            input: 'name__icontains',
            inputPlaceholder: 'Ingrese nombre a buscar',
            inputClassName: 'form-control',
          },
        ],
      }}
    />
  </div>
);
```


### Implementación final

```javascript
<div className="table-responsive table-2-responsive">
  <Table2New
    config={{
      ajax: {
        url: `${URL_LIST_BY_PMTDI_ID}${this.props.match.params.id}`,
        method: 'GET',
        liveHeaders: () => ({
          Authorization: `JWT ${getUserData().token}`,
        }),
      },
      conector,
      debug: {
        inputSearch: false,
        paginator: false,
        initiaAjax: false,
        dataset: false,
      },
      extraThead: paginator => (<button onClick={() => { console.log(paginator); }}>a</button>),
      onBeforeSend: () => '',
      onAfterSend: () => '',
      errors: {
        onAjaxError: () => '',
      },
      table: {
        className: 'table table-hover table-condensed',
        thead: {
          className: '',
          actions: {
            className: '',
            cssTH: {
              width: '100px',
              minWidth: '100px',
            },
            component: instance => (!this.state.is_published ? (
              <BtnEdit
                to={`/pmtdi/view/${instance.pmtdi}/${instance.id}`}
              />) : <BtnView
                to={`/pmtdi/view/${instance.pmtdi}/${instance.id}
                `}/>),
          },
        },
      },
      paginator: {
        prevLink: 3,
        nextLink: 3,
      },
      columns: [
        {
          title: _('type'),
          name: 'type.name',
          textEmpty: 'Sin Tipo',
          ordering: false,
        },
        {
          title: _('Start'),
          name: 'programmedworkdetail.start_dt',
          textEmpty: 'Sin Fecha',
          ordering: false,
          component: instance => (instance.details ? moment(instance.details.start_dt).format('DD-MM-YYYY H:mm:ss') : '--'),
          style: {
            minWidth: '200px',
            maxWidth: '200px',
          },
        },
        {
          title: _('End'),
          name: 'programmedworkdetail.end_dt',
          textEmpty: 'Sin Fecha',
          ordering: false,
          component: instance => (instance.details ? moment(instance.details.end_dt).format('DD-MM-YYYY H:mm:ss') : '--'),
          style: {
            minWidth: '200px',
            maxWidth: '200px',
          },
        },
        {
          title: _('Inspection'),
          name: 'programmedworkdetail.requires_inspection',
          textEmpty: 'Sin Estatus',
          ordering: false,
          component: instance => (
            instance.details ? (instance.details.requires_inspection ? 'Si' : 'No') : '--'),
        },
        {
          title: _('Status'),
          name: 'programmedworkdetail.status',
          ordering: false,
          textEmpty: 'Sin Estatus',
          component: instance => (instance.details ? resolveStatusProgrammedWork(instance.details.status) : '--'),
          style: {
            minWidth: '100px',
            maxWidth: '100px',
          },
        },
      ],
    }}
  />
</div>
```

## Otra implementacion con atributos nuevos

```javascript

import React from 'react';
import { Link } from 'react-router-dom';
import { _ } from 'i18n';

export default (
  self,
  getUserData,
  TableSelectAsync,
  API,
  AREAS_API,
  TableDateYYYYMM,
  PMTDI_REQUESTERS_API,
  PMTDI_TYPES_API,
  randomInt,
  TableSelect,
  conector,
) => ({
  ajax: {
    url: self.state.url,
    method: 'GET',
    liveHeaders: () => ({
      Authorization: `JWT ${getUserData().token}`,
    }),
  },
  paramsConection: {
    offset: 'offset',
    limit: 'limit',
    count: 'count',
    ordering: 'ordering',
  },
  conector,
  debug: {
    inputSearch: false,
    paginator: false,
    initiaAjax: false,
    dataset: false,
  },
  onBeforeSend: e => self.loadPMTDIList(e),
  onAfterSend: e => self.setPMTDIList(e),
  errors: {
    onAjaxError: self.callbackAjaxError,
  },
  table: {
    className: 'table table-hover table-condensed table-bordered',
    resetButton: {
      className: 'btn btn-sm btn-warning',
      title: 'Restablecer',
      onReset: self.callbackReset,
    },
    theadExtra: () => (<button
      className="btn btn-default hidden"
      onClick={
        () => {}}
    >test</button>),
    thead: {
      className: '',
      actions: {
        title: 'Acciones',
        className: 'claudio',
        style: {
          width: '130px',
          minWidth: '130px',
        },
      },
    },
  },
  columnsAction: {
    style: { color: 'red' },
    component: self.TableEditTemplate,
  },
  paginator: {
    className: 'pagination pagination-sm',
    style: {
      margin: '0px',
    },
    prevLink: 3,
    nextLink: 3,
    hidden: true,
  },
  columns: [
    {
      title: _('nemo'),
      name: 'natural_key',
      textEmpty: 'Sin nombre',
      cssTH: {
        width: '250px',
        minWidth: '250px',
      },
      component: instance => (
        <span>
          <Link to={`/pmtdi/view/${instance.id}`}>
            {instance.natural_key}
          </Link>
        </span>
      ),
      input: 'natural_key__icontains',
      inputClassName: 'form-control',
    },
    {
      title: _('Zone'),
      name: 'zone.name',
      ordering: 'zone',
      style: {
        minWidth: '220px',
        maxWidth: '220px',
      },
      component: instance => (
        <span>
          <div>
            {`${instance.id} `}
          </div> {instance.name}
        </span>
      ),
      /* required if selec input exist */
      componentInput: TableSelectAsync,
      input: 'zone',
      inputProps: {
        className: 'menu-outer-top',
        optionRenderer: e => (
          <span>
            <div>
              {`${instance.id} `}
            </div> {instance.category}
          </span>
        ),
      },
      getData: (input, callback) => {
        const list = () => apiEndpoint().then(e => e.data.map(i => ({
          ...i,
          label: i.name,
          value: i.id,
        })));
        list()
          .then(e => callback(null, { options: e, complete: true }))
          .catch(() => callback(null, { options: [], complete: true }));
      },
    },
    {
      title: _('Area'),
      name: 'area',
      ordering: 'area',
      cssTH: {
        width: '230px',
        minWidth: '230px',
      },
      /* required if selec input exist */
      componentInput: TableSelectAsync,
      input: 'area',
      getData: (input, callback) => {
        const areasList = () => apiEndpoint().then(
          e => e.data.map(i => ({
            ...i,
            label: i.name,
            value: i.id,
          })));
        areasList()
          .then(e => callback(null, { options: e, complete: true }))
          .catch(() => callback(null, { options: [], complete: true }));
      },
    },
    {
      title: _('period'),
      name: 'period',
      textEmpty: 'Sin Fecha',
      style: {
        minWidth: '120px',
        maxWidth: '120px',
      },
      componentInput: TableDateYYYYMM,
      input: 'period',
      component: instance => instance.status.slice(0, -3),
    },
    {
      title: 'Solicitante',
      name: 'requester.name',
      ordering: 'requester',
      cssTH: {
        width: '200px',
        minWidth: '200px',
      },
      /* required if selec input exist */
      componentInput: TableSelectAsync,
      input: 'requester',
      getData: (input, callback) => {
        const list = () => apiEndpoint().then(
          e => e.data.map(i => ({
            ...i,
            label: i.name,
            value: i.id,
          })));
        list()
          .then(e => callback(null, { options: e, complete: true }))
          .catch(() => callback(null, { options: [], complete: true }));
      },
    },
    {
      title: _('type'),
      name: 'type.name',
      ordering: 'type',
      cssTH: {
        width: '200px',
        minWidth: '200px',
      },
      /* required if selec input exist */
      componentInput: TableSelectAsync,
      input: 'type',
      getData: (input, callback) => {
        const list = () => apiEndpoint().then(
          e => e.data.map(i => ({
            ...i,
            label: i.name,
            value: i.id,
          })));
        list()
          .then(e => callback(null, { options: e, complete: true }))
          .catch(() => callback(null, { options: [], complete: true }));
      },
    },
    {
      title: _('detail'),
      name: 'detail',
      textEmpty: 'Sin deatlle',
      input: 'detail__icontains',
      component: e => (<div title={e.detail} style={{ width: '360px' }}className="ellipsis-text">{e.detail}</div>),
    },
    {
      title: 'Trabajos',
      name: 'total_work',
      ordering: false,
      cssTH: { textAlign: 'right' },
      style: {
        textAlign: 'right',
      },
    },
    {
      title: 'Aceptados',
      name: 'work_accepted',
      ordering: false,
      style: {
        textAlign: 'right',
      },
    },
    {
      title: 'Rechazados',
      name: 'work_rejected',
      ordering: false,
      style: {
        textAlign: 'right',
      },
    },
    {
      title: 'Infactibles',
      name: 'work_infeasible',
      ordering: false,
      style: {
        textAlign: 'right',
      },
    },
    {
      title: 'Pendientes',
      name: 'work_pending',
      ordering: false,
      style: {
        textAlign: 'right',
      },
    },
    {
      title: 'Publicado',
      name: 'is_published',
      cssTH: {
        width: '150px',
        minWidth: '150px',
      },
      input: 'is_published',
      inputProps: {
        noResultsText: 'No se encontro coincidencia',
      },
      componentInput: TableSelect,
      data: [{ label: 'SI', value: 'true' }, { label: 'NO', value: 'false' }],
      component: instance => (instance.isSuperUser ? 'SI' : 'NO'),
    },
  ],
});

```

### Implementación 3

```javascript
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Tabl3 from 'tabl3';
import moment from 'moment';
import { getUserData } from '../../services/jwtSession';
import conector from connector;
import { atUrl } from '../../services/at_api';
import { _ } from '../../services/CONST';

class AtTableList extends Component {
  render() {
    return (
      <div>
        <Tabl3
          config={{
            ajax: {
              url: atUrl,
              method: 'GET',
              liveHeaders: () => ({
                Authorization: `JWT ${getUserData().token}`,
              }),
            },
            paramsConection: {
              offset: 'offset',
              limit: 'limit',
              count: 'count',
              ordering: 'ordering',
            },
            conector,
            debug: {
              inputSearch: false,
              paginator: false,
              initiaAjax: false,
              dataset: false,
            },
            onBeforeSend: e => console.log(e),
            onAfterSend: e => console.log(e),
            errors: {
              onAjaxError: e => console.log(e),
            },
            table: {
              className: 'table-box-form table table-hover table-condensed table-bordered',
              theadExtra: () => (<tr>
                <td rowSpan="0" colSpan="5" />
                <td>{_('Installations')}</td>
              </tr>),
              thead: {
                className: '',
                actions: {
                  title: 'Acciones',
                  className: 'claudio',
                  style: {
                    width: '130px',
                    minWidth: '130px',
                  },
                },
              },
            },
            columnsAction: {
              component: i => <span>{i.id}</span>,
            },
            paginator: {
              className: 'pagination pagination-sm',
              style: {
                margin: '0px',
                height: '40px',
              },
              prevLink: 3,
              nextLink: 3,
              hidden: true,
            },
            columns: [
              {
                title: _('ID'),
                name: 'id',
                rowSpan: 1,
              },
              {
                title: _('naturalKey'),
                name: 'natural_key',
                rowSpan: 2,
                cssTH: { color: 'red' },
              },
              {
                title: _('name'),
                name: 'name',
              },
              {
                title: _('period'),
                name: 'programmed_work.created_at',
                component: i => (
                  <span>
                    {moment(i.programmed_work.details.start_dt).format('YYYY-MM-DD')} - {moment(i.programmed_work.details.end_dt).format('YYYY-MM-DD')}
                  </span>
                ),
              },
            ],
          }}
        />
      </div>
    );
  }
}

// AtTableList.propTypes = {
//   list: PropTypes.array.isRequired,
// };

export default AtTableList;
```
