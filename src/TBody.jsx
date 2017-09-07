import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TR from './TR'
import { makeKey } from './core/core'

class TBody extends Component {
  render() {
    if (!this.props.tableState.dataset) {
      return <tbody />
    }
    return (
      <tbody>
        {this.props.tableState.dataset.results.map((e, key) => {
          const comp = (<TR
            key={makeKey(key)}
            element={e}
            tableState={this.props.tableState}
            updateState={this.props.updateState}
          />);

          return comp
        }
        )}
      </tbody>
    )
  }
}

TBody.propTypes = {
  updateState: PropTypes.func,
  tableState: PropTypes.object,
}

export default TBody
