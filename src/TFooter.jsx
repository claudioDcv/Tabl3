import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paginator from './Paginator'

class TFooter extends Component {
  render() {
    const state = this.props.tableState
    return (
      <tfoot>
        <tr>
          <td colSpan={state.columns.length + (state.config.table.thead.actions ? 1 : 0)}>
            {state.paginator.pages > 1
              ? <Paginator
                  tableState={this.props.tableState}
                  updateState={this.props.updateState}
                />
              : undefined}
          </td>
        </tr>
      </tfoot>
    )
  }
}

TFooter.propTypes = {
  updateState: PropTypes.func,
  tableState: PropTypes.object,
}

export default TFooter
