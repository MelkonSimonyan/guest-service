import './CartBtn.css'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectInit } from '../../features/init/initSlice'
import { selectCart } from '../../features/cart/cartSlice'
import { useLang } from '../../hooks/useLang'

const CartBtn = () => {
  const { initData } = useSelector(selectInit)
  const { cartProducts } = useSelector(selectCart)
  const [quantity, setQuantity] = useState(0)
  const [amount, setAmount] = useState(0)
  const getLang = useLang()

  useEffect(() => {
    let quantity = 0
    let amount = 0
    for (let idx in cartProducts) {
      quantity += cartProducts[idx].quantity
      amount += cartProducts[idx].quantity * cartProducts[idx].price
    }
    setQuantity(quantity)
    setAmount(amount)
  }, [cartProducts])

  if (!quantity) {
    return null
  }

  return (
    <div className='cart-btn-wrapper'>
      <div className='container'>
        <Link
          className='cart-btn btn btn_lg'
          to='/cart/'
        >
          <span>
            {getLang('cart')} <span className='cart-btn__count'>{quantity}</span>
          </span>
          <span>{amount}&nbsp;{initData.hotel.currency}</span>
        </Link>
      </div>
    </div>
  )
}

export default CartBtn