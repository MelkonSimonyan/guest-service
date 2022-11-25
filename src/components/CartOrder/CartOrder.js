import './CartOrder.css'

import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectInit } from '../../features/init/initSlice'
import { selectCart } from '../../features/cart/cartSlice'
import { useLang } from '../../hooks/useLang'
import CartItem from '../CartItem/CartItem'
import CartForm from '../CartForm/CartForm'
import CartEmpty from '../CartEmpty/CartEmpty'

const CartOrder = () => {
  const { initData } = useSelector(selectInit)
  const { cartProducts } = useSelector(selectCart)
  const [amount, setAmount] = useState(0)
  const getLang = useLang()

  useEffect(() => {
    let amount = 0
    for (let idx in cartProducts) {
      amount += cartProducts[idx].quantity * cartProducts[idx].price
    }
    setAmount(amount)
  }, [cartProducts])

  const serviceFee = useMemo(() => {
    return amount * 10 / 100
  }, [amount])

  if (!cartProducts.length) {
    return (
      <div className='cart'>
        <CartEmpty />
      </div>
    )
  }

  return (
    <div className='cart'>
      <div className='cart__list'>
        {cartProducts.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

      <div className='cart__data'>
        <div className='cart__data-row'>
          <div className='cart__data-title'>{getLang('orderPrice')}</div>
          <div className='cart__data-value'>{amount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
        </div>

        <div className='cart__data-row'>
          <div className='cart__data-title'>{getLang('serviceFee')}</div>
          <div className='cart__data-value'>{serviceFee}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
        </div>

        <div className='cart__data-row _total'>
          <div className='cart__data-title'>{getLang('amount')}</div>
          <div className='cart__data-value'>{amount + serviceFee}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
        </div>
      </div>

      <CartForm />
    </div>
  )
}

export default CartOrder