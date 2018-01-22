import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TR from './TR'
import { makeKey } from './core/core'

const EMPTY_RESULTS = 'No se encontraron resultados'
const styleEmptyTd = {
  textAlign: 'center',
  verticalAlign: 'middle',
  height: '150px',
};

class TBody extends Component {

  render() {
    const { tableState, getEmptyMessage, updateState } = this.props
    const colSpan = tableState.columns.length + (tableState.config.table.thead.actions ? 1 : 0)

    if (!tableState.dataset) {
      return <tbody />
    }
    return (
      <tbody>
        {tableState.dataset.results.length > 0 ? (
          tableState.dataset.results.map((e, key) => {
            const comp = (<TR
              key={makeKey(key)}
              element={e}
              tableState={tableState}
              updateState={updateState}
            />);

            return comp
          })
        ) : getEmptyMessage && getEmptyMessage instanceof Function? getEmptyMessage({
          colSpan,
        }) : <tr><td style={styleEmptyTd} colSpan={colSpan}>{EMPTY_RESULTS}</td></tr> }
      </tbody>
    )
  }
}

TBody.propTypes = {
  getEmptyMessage: PropTypes.func,
  updateState: PropTypes.func,
  tableState: PropTypes.object,
}

export default TBody
