import React from 'react'
import ReactDOM from 'react-dom'
import Table2 from './tabl3/index'

import './tabl3/style.css'
import conector from './__tests__/conector'

const baseUrl = 'http://127.0.0.1:8000'
const target = document.getElementById('root')

ReactDOM.render(
  <Table2
    ref={e => {
      this.table = e
    }}
    config={{
      ajax: {
        url: `${baseUrl}/colors/?limit=4`,
        method: 'GET',
        liveHeaders: () => ({}),
        test: true,
      },
      conector,
      debug: {
        inputSearch: true,
        paginator: true,
        initiaAjax: false,
        dataset: true,
      },
      onBeforeSend: e => {
        console.log(e)
      },
      onAfterSend: e => {
        console.log(e)
      },
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
            component: e =>
              <div>
                {e.id}
              </div>,
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
  />,
  target
)
Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help
