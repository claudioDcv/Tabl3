import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

/* EXAMPLE
{
  title: 'Zona',
  name: 'zone.name',
  ordering: 'zone',
  cssTH: {
    width: '230px',
    minWidth: '230px',
  },
  component: instance => (
    <span>
      <div className={`colour colour-${instance.zone.colour}`}>
        {`${instance.zone.natural_key} `}
      </div> {instance.zone.name}
    </span>
  ),
  componentInput: TableSelect,
  input: 'zone',
  inputChangeToggleSelect: {
    id: 'table-pmtdi',
    minHeight: '350px',
  },
  inputProps: {
    className: 'menu-outer-top',
    optionRenderer: e => (
      <div className="colour-select-tag">
        <div className={`colour-inline colour-${e.colour}`}>
          {`${e.natural_key} `}
        </div> {e.name}
      </div>
    ),
  },
  // API.listZoneSkipPagination() (this function return axios promise)
  getData: (input, callback) => {
    const list = () => API.listZoneSkipPagination().then(e => e.data.map(i => ({
      ...i,
      label: i.name,
      value: i.id,
    })));
    list()
      .then(e => callback(null, { options: e, complete: true }))
      .catch(() => callback(null, { options: [], complete: true }));
  },
*/

const select = (handlerChangeInput, instance, value) => {
  return (
    <Select.Async
      {...instance.inputProps}
      onFocus={() => {
        if (instance.inputChangeToggle) {
          const elm = document.getElementById(instance.inputChangeToggle.id)
          elm.style.minHeight = instance.inputChangeToggle.minHeight
        }
      }}
      openOnFocus={true}
      onOpen={() => {
        if (instance.inputChangeToggle) {
          const elm = document.getElementById(instance.inputChangeToggle.id)
          elm.style.minHeight = instance.inputChangeToggle.minHeight
        }
      }}
      onClose={() => {
        if (instance.inputChangeToggle) {
          const elm = document.getElementById(instance.inputChangeToggle.id)
          elm.style.minHeight = 'auto'
        }
      }}
      name={instance.name}
      placeholder={instance.placeholder}
      value={value}
      loadOptions={instance.getData}
      onChange={handlerChangeInput}
    />
  )
}

export default select
