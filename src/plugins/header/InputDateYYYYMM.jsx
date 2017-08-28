import React from 'react'
import Datetime from 'react-datetime'

const moment = require('moment')

const renderers = {
  renderDay: (props, currentDate, selectedDate) => {
    return (
      <td {...props}>
        {'0' + currentDate.date()}
      </td>
    )
  },
  renderMonth: (props, month, year, selectedDate) => {
    return (
      <td {...props}>
        {month}
      </td>
    )
  },
  renderYear: (props, year, selectedDate) => {
    return (
      <td {...props}>
        {year % 100}
      </td>
    )
  },
}

const InputDate = (handlerChangeInput, instance, value) => {
  const makeDate = e => {
    let isError = false
    let format = ''
    try {
      format = e.format('YYYY-MM')
      format = `${format}-01`
    } catch (e) {
      format = ''
      isError = true
    } finally {
    }
    return format
  }
  const placeholderConst = instance.placeholder ? instance.placeholder : ''
  return (
    <div className="table-2-input-container-date">
      <button
        className="table-2-input-clear-date"
        onClick={() => {
          if (instance.inputChangeToggle) {
            const elm = document.getElementById(instance.inputChangeToggle.id)
            elm.style.minHeight = 'auto'
          }
          handlerChangeInput('')
        }}
      >
        ×
      </button>
      <Datetime
        onChange={e => {
          const format = makeDate(e)
          handlerChangeInput(format)
        }}
        onFocus={() => {
          if (instance.inputChangeToggle) {
            const elm = document.getElementById(instance.inputChangeToggle.id)
            elm.style.minHeight = instance.inputChangeToggle.minHeight
          }
        }}
        onBlur={() => {
          if (instance.inputChangeToggle) {
            const elm = document.getElementById(instance.inputChangeToggle.id)
            elm.style.minHeight = 'auto'
          }
        }}
        closeOnSelect={true}
        inputProps={{
          placeholder: placeholderConst,
        }}
        locale="es"
        open={false}
        input={true}
        value={value ? value.slice(0, -3) : ''}
        dateFormat="YYYY-MM"
        timeFormat={false}
      />
    </div>
  )
}

export default InputDate
