import React, { Component, PropTypes } from 'react'
import { SelectField, MenuItem } from 'material-ui'

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
      <span>
        <SelectField onChange={onChange}
                value={value}>
          {options.map(option =>
            <MenuItem value={option} key={option} primaryText={option} />
            )
          }
        </SelectField>
      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
