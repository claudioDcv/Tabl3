# Tabl3 React Server Side

- Tabla 100% server side creada en `React`
- Agnostica a cualquier libreria que maneje el estado como `Redux` o `Reflux`,
- Pensada para ser 100% compatible con `Django Rest Framework` pero no exclusiva, por tanto si el backend retorna un objeto `JSON` como el que requiere esta tabla, no existe problema para funcionar con otros lenguajes o framework
- extensible con `Plugins`
- Tabla sin dependencias, excepto los plugins creados que son de uso opcional


## Compilar projecto

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
    <Table2New
      config={}
    />
  );
}
```

- ademas para hacer referencia a la tabla y utilizar el metodo `updateQueryStringOut` que actualiza parametros de la tabla se puede utilizar `ref={(e) => { this.table = e; }}`

```javascript

render() {
  return (
    <Table2New
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

## Implementación

```javascript
import React from 'react';
import axios from 'axios';
import Table2 from '../../Table2New/Index';
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
    <Table2
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
