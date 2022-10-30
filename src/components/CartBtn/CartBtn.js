import './CartBtn.css'

import React from 'react'
import { Link } from 'react-router-dom'

const CartBtn = () => {
  return (
    <div className='cart-btn-wrapper'>
      <div className='container'>
        <Link
          className='cart-btn btn'
          to='/cart/'
        >
          <span>
            Корзина <span className='cart-btn__count'>7</span>
          </span>
          <span>104,00&nbsp;$</span>
        </Link>
      </div>
    </div>
  )
}

export default CartBtn