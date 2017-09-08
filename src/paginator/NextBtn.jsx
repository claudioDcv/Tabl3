import React from 'react'
import PropTypes from 'prop-types'
import { PAGINATOR_NEXT_PAGE } from '../core/const'

class NextBtn extends React.Component {
  render() {
    const isDisabled = this.props.tableState.paginator.lastPage
    const classDisabled = isDisabled ? 'disabled' : ''
    return (
      <li className={classDisabled}>
        <a
          role="button"
          tabIndex="0"
          onClick={() => {
            if (!isDisabled) {
              this.props.updateState(PAGINATOR_NEXT_PAGE)
            }
          }}
        >
          <span aria-hidden="true" className="table-2-new-next-btn">&raquo;</span>
        </a>
      </li>
    )
  }
}

NextBtn.propTypes = {
  tableState: PropTypes.object,
  updateState: PropTypes.func,
}

export default NextBtn
