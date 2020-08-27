import React from 'react'
import './Checkbox.css'

export const Checkbox = ({ id, isCheck = false, text = 'one' }) => {
  return (
    <React.Fragment>
      <label className='poll'>
        <input type='checkbox'></input>
        <span className='checkmark'></span>
        <div className='text'>{text}</div>
      </label>
    </React.Fragment>
  )
}
