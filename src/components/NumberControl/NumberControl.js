import './NumberControl.css'

import React from 'react'

const NumberControl = ({ value, decrease, increase }) => {
  return (
    <div className='number-control'>
      <button
        type='button'
        className='number-control__btn _decrease'
        onClick={decrease}
      ></button>

      <span className='number-control__value'>{value}</span>

      <button
        type='button'
        className='number-control__btn _increase'
        onClick={increase}
      ></button>
    </div>
  )
}

export default NumberControl