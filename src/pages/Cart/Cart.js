import './Cart.css'

import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectCart } from '../../features/cart/cartSlice'
import { useLang } from '../../hooks/useLang'
import CartItem from '../../components/CartItem/CartItem'
import CartForm from '../../components/CartForm/CartForm'

const Cart = () => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const { cartProducts } = useSelector(selectCart)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'cart',
      pageTitle: getLang('cart'),
      parentLink: window.history.state && window.history.state.key ? -1 : '/'
    }))
  }, [])

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
      <div className='content'>
        <div className='container'>
          <div className='cart'>
            <h1 style={{ textAlign: 'center' }}>Корзина пуста</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='content'>
      <div className='container'>
        <div className='cart'>
          {/* <div className='cart__head-note'>Примерное время ожидания - 15 мин</div> */}

          <div className='cart__list'>
            {cartProducts.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          <div className='cart__data'>
            <div className='cart__data-row'>
              <div className='cart__data-title'>{getLang('order_cost')}</div>
              <div className='cart__data-value'>{amount}&nbsp;{initData.hotel.currency}</div>
            </div>

            <div className='cart__data-row'>
              <div className='cart__data-title'>{getLang('service_fee')}</div>
              <div className='cart__data-value'>{serviceFee}&nbsp;{initData.hotel.currency}</div>
            </div>

            <div className='cart__data-row _total'>
              <div className='cart__data-title'>{getLang('total')}</div>
              <div className='cart__data-value'>{amount + serviceFee}&nbsp;{initData.hotel.currency}</div>
            </div>
          </div>

          <CartForm />
        </div>
      </div>
    </div>
  )
}

export default Cart