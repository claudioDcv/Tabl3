/* eslint no-console: 0 */
import React from 'react'
import moment from 'moment'
import { dotNotationToObject } from '../../../core/core'

/* EXAMPLE
{
  title: 'Periodo',
  name: 'period',
  textEmpty: 'Sin Fecha',
  component: FieldMoment,
  dateFormat: 'YYYY-MM',
  input: 'period',
},
*/
export default (instance, column) => {
  const object = dotNotationToObject(instance, column.name)

  if (!column.dateFormat) {
    console.warn(column.name, 'missing (dateFormat) attribute, is required in column definition')
    return (
      <span>
        {object}
      </span>
    )
  }
  const date = moment.utc(object).local().format(column.dateFormat)
  return (
    <span>
      {date}
    </span>
  )
}
