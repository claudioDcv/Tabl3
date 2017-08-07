import React from 'react'
import PropTypes from 'prop-types'
import { PAGINATOR_PREV_PAGE } from '../core/const'

class PrevBtn extends React.Component {
  render() {
    const isDisabled = this.props.tableState.paginator.firstPage
    const classDisabled = isDisabled ? 'disabled' : ''
    return (
      <li className={classDisabled}>
        <a
          role="button"
          tabIndex="0"
          onClick={() => {
            if (!isDisabled) {
              this.props.updateState(PAGINATOR_PREV_PAGE)
            }
          }}
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    )
  }
}

PrevBtn.propTypes = {
  tableState: PropTypes.object,
  updateState: PropTypes.func,
}

export default PrevBtn
