import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from './es'
import { makeKey } from './core/core'
import HeaderBtn from './HeaderBtn'

class Thead extends Component {
  TH(e, key) {
    return (
      <th key={makeKey(key)} className={e.className} style={e.cssTH}>
        <HeaderBtn
          element={e}
          tableState={this.props.tableState}
          updateState={this.props.updateState}
          handlerInputSearch={this.props.handlerInputSearch}
        />
      </th>
    )
  }
  actions() {
    const thead = this.props.tableState.config.table.thead
    return (
      <th style={thead.actions.style} className={thead.actions.className}>
        <span className="table2-btn-ordering-disabled">
          {thead.actions.title || _.actions}
        </span>
      </th>
    )
  }
  render() {
    const thead = this.props.tableState.config.table.thead
    const config = this.props.tableState.config
    const state = this.props.tableState
    return (
      <thead className={thead.className}>
        {config.table.resetButton || config.table.extraThead ? <tr>
          <td colSpan={state.columns.length + (state.config.table.thead.actions ? 1 : 0)}>
            {config.table.resetButton
              ? <button
                  onClick={this.props.resetToInitialState}
                  className={`table2-btn-reset ${config.table.resetButton.className}`}
                >
                  {config.table.resetButton.title}
                </button>
              : undefined}
            {typeof config.table.theadExtra === 'function' ? config.table.theadExtra(
              this.props.tableState.paginator) : undefined}
          </td>
        </tr> : undefined}
        <tr>
          {this.props.tableState.columns.map((e, key) => this.TH(e, key))}
          {thead.actions ? this.actions() : undefined}
        </tr>
      </thead>
    )
  }
}

Thead.propTypes = {
  updateState: PropTypes.func,
  tableState: PropTypes.object,
  handlerInputSearch: PropTypes.func,
  resetToInitialState: PropTypes.func,
}

export default Thead
