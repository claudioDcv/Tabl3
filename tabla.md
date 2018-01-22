# Tabl3
> Nuevas funciones

```javascript
// Axios connector (#00)
import axios from 'axios';
const connector = (opt, callback, errorCallback, nonErrorAjax, onAfterSend) => {
    return axios(opt)
        .then((response) => {
            nonErrorAjax();
            callback(response.data, response, opt);
            onAfterSend(response);
        }, response => errorCallback(response));
};

config={
    ajax: {
        liveHeaders: () => ({
            Authorization: api.getUserToken(),
        }),
    },
    connector: connector,
    table: {
        getEmptyMessage: '#01',
        responsive: '#02',
        className: '#03',
        thead: {
            className: '',
            actions: {
                title: 'Acciones',
                className: 'tabl3-thead-actions',
                style: {
                    width: '100px',
                    minWidth: '100px',
                },
            },
        },
    },
    paginator: {
        className: 'pagination pagination-sm',
        style: {
            margin: '0px',
            height: '36px',
        },
        prevLink: 3,
        nextLink: 3,
        hidden: false,
    },
    columns: [
        col, // #04
    ],
}
```

```javascript
// getResource
handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    const changeUrl = url => url.replace(/\/\d+\//g, `/${value.format('YYYYMMDD')}/`);
    this.table.getResource(url => ({ params: {}, url: changeUrl(url) }), true);
}
```

```javascript
// Table
<Tabl3 config={config} ref={(e) => { this.table = e; }} />
```

- 00: `config.connector`:
    - `type`: Function
    - `default`: No Posee [required]

- 01: `config.table.getEmptyMessage`:
    - `type`: [Function]
    - `params`: `{ colSpan: [int]}`
    - `return`: NodeJSX
    - `default`: 'No se encontraron resultados'

- 02: `config.table.responsive`:
    - `type`: [boolean]
    - `default`: false
    - `description`: agregar comportamiento responsivo a tabla (solo bootstrap 3)

- 03: `config.table.className`:
    - `type`: [String]
    - `default`: ''
    - `description`: clases css para nodo <table>
.

# col #04

```javascript
{
    title: 'Nombre',
    inputPlaceholder: 'Buscar name',
    style: { minWidth: '100px', maxWidth: '100px' },
    componentInput: TableSelectAsync,
    input: 'state_id',
    inputProps: { className: 'menu-outer-top', optionRenderer: e => <StateBox state={e} /> },
    getData: (input, callback) => { getStateData(input, callback, this.props.dispatch, 'sip'); },
    name: 'state_id',
    ordering: 'state_id',
    cssTH: { width: '100px', minWidth: '100px' },
    component: i => <StateBox state={i.state} />,
},

```
