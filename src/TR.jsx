/* eslint no-console: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { makeKey, dotNotationToObject } from './core/core'

class TR extends Component {
  static TD(o, col, key) {
    let object = col.isEmpty || col.textEmpty
    try {
      object = dotNotationToObject(o, col.name)
    } catch (e) {
      console.warn(`atribute (${col.name}), non exist`, e.toString())
    }
    if (object === 'undefined' || object === '') {
      console.warn(`atribute (${col.name}), is undefined`)
      object = col.isEmpty || col.textEmpty
    }
    return (
      <td style={col.style} className={col.className} key={makeKey(key)}>
        {object}
      </td>
    )
  }
  constructor(props) {
    super(props)
    this.TDS = this.TDS.bind(this)
  }
  componentAction(o) {
    const actions = this.props.tableState.config.columnsAction
    if (actions.component) {
      return actions.component(o)
    }
    return undefined
  }
  TDS() {
    const st = this.props.tableState
    const o = this.props
    const td = (col, key) => {
      if (col.component) {
        return (
          <td style={col.style} key={makeKey(key)} className={col.className}>
            {col.component(o.element, col, key)}
          </td>
        )
      }
      return TR.TD(o.element, col, key)
    }
    return (
      <tr>
        {st.columns.map((col, key) => td(col, key))}
        {st.config.columnsAction
          ? <td
              key="actions"
              style={st.config.columnsAction.style || {}}
              className={st.config.columnsAction.className || ''}
            >
              {this.componentAction(o.element)}
            </td>
          : undefined}
      </tr>
    )
  }
  render() {
    return this.TDS()
  }
}

TR.propTypes = {
  updateState: PropTypes.func,
  tableState: PropTypes.object,
}

export default TR
