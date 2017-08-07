import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TD extends Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
  }
  update() {
    const val = 'hola desde td'
    this.props.updateState('now', val)
  }
  render() {
    return (
      <div>
        {this.props.element.id}
      </div>
    )
  }
}

TD.propTypes = {
  updateState: PropTypes.func.required,
  element: PropTypes.object.required,
}

export default TD
