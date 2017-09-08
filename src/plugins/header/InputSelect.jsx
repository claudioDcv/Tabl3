import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const select = (handlerChangeInput, instance, value) => {
  return (
    <Select
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
      options={instance.data}
      onChange={handlerChangeInput}
    />
  )
}

export default select
