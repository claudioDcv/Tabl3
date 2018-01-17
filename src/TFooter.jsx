import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paginator from './Paginator'

class TFooter extends Component {
  render() {
    const state = this.props.tableState
    let paginator = (<ul
      style={(this.props.tableState.config.paginator || {}).style || {}}
      className={`table-2-new-paginator-null ${(this.props.tableState.config.paginator || {}).className || 'pagination pagination-sm'}`}
    />)
    if (this.props.extract) {
      if (state.paginator.pages > 1 ) {
        paginator = (<Paginator
         tableState={this.props.tableState}
         updateState={this.props.updateState}
         />)
      }
      return paginator
    }
    return (
      <div className={state.paginator.pages > 1 ? 'active-paginator' : 'inactive-paginator'}>
        <div>
          <div colSpan={state.columns.length + (state.config.table.thead.actions ? 1 : 0)}>
            {state.paginator.pages > 1
              ? <Paginator
                  tableState={this.props.tableState}
                  updateState={this.props.updateState}
                />
              : undefined}
          </div>
        </div>
      </div>
    )
  }
}

TFooter.propTypes = {
  updateState: PropTypes.func,
  tableState: PropTypes.object,
  extract: PropTypes.bool,
}

export default TFooter
