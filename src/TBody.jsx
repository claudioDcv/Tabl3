import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TR from './TR'
import { makeKey } from './core/core'

class TBody extends Component {
  constructor(props) {
    super(props);
    this.endRender = this.endRender.bind(this);
  }
  endRender(e, key) {
    if (key + 1 === this.props.tableState.columns.length) {
      setTimeout(() => {
        this.props.tableState.config.onAfterRender(this.props.tableState.paginator);
      }, 0);
    }
  }
  render() {
    if (!this.props.tableState.dataset) {
      return <tbody />
    }
    return (
      <tbody>
        {this.props.tableState.dataset.results.map((e, key) => {
          this.endRender(e, key);
          return (<TR
            key={makeKey(key)}
            element={e}
            tableState={this.props.tableState}
            updateState={this.props.updateState}
          />);
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
