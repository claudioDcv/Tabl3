import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PAGINATOR_GOTO_PAGE } from './core/const'

import { makeKey } from './core/core'
import NextBtn from './paginator/NextBtn'
import PrevBtn from './paginator/PrevBtn'

class Paginator extends Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
  }
  update(key, val) {
    this.props.updateState(key, val)
  }
  numberPagination() {
    const config = this.props.tableState.config.paginator
    const paginator = this.props.tableState.paginator
    const current = paginator.current
    if (paginator) {
      if (!config.prevLink && parseInt(config.prevLink, 10) !== 0) {
        config.prevLink = 3;
      }
      if (!config.nextLink && parseInt(config.nextLink, 10) !== 0) {
        config.nextLink = 3;
      }

      const lengthPagation = []
      const min = current - config.prevLink < 1 ? 1 : current - config.prevLink
      const currNextLink = paginator.current + config.nextLink
      const max = current + config.nextLink > paginator.pages ? paginator.pages : currNextLink

      for (let i = min; i <= max; i += 1) {
        lengthPagation.push(i)
      }

      return lengthPagation.map((nPage, key) => {
        const classCurrent = current === nPage ? 'active' : ''
        if (classCurrent === 'active') {
          return (
            <li key={makeKey(key)} className={classCurrent}>
              <span>
                {nPage}
              </span>
            </li>
          )
        }
        return (
          <li key={makeKey(key)}>
            <a
              className={classCurrent}
              role="button"
              tabIndex="0"
              onClick={() => this.update(PAGINATOR_GOTO_PAGE, nPage)}
            >
              {nPage}
            </a>
          </li>
        )
      })
    }
    return undefined
  }
  render() {
    return (
      <ul
        className={`table-2-new-paginator ${
          this.props.tableState.config.paginator.className || ''}`}
        style={this.props.tableState.config.paginator.style || {}}
      >
        <PrevBtn tableState={this.props.tableState} updateState={this.props.updateState} />
        {this.numberPagination()}
        <NextBtn tableState={this.props.tableState} updateState={this.props.updateState} />
      </ul>
    )
  }
}

Paginator.propTypes = {
  updateState: PropTypes.func,
  tableState: PropTypes.object,
}

export default Paginator
