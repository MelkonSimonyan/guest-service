import './CartBtn.css'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectInit } from '../../features/init/initSlice'
import { selectPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectCart } from '../../features/cart/cartSlice'

import { useLang } from '../../hooks/useLang'

const CartBtn = () => {
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const { pageId } = useSelector(selectPageInfo)
  const { cartProducts } = useSelector(selectCart)
  const [cartBtnData, setCartBtnData] = useState({})

  useEffect(() => {
    let quantity = 0
    let amount = 0

    for (let idx in cartProducts) {
      quantity += cartProducts[idx].quantity
      amount += cartProducts[idx].quantity * cartProducts[idx].price
    }

    setCartBtnData({
      quantity,
      amount
    })
  }, [cartProducts])

  if (!cartBtnData.quantity || pageId === 'cart') {
    return null
  }

  return (
    <>
      <div className='cart-btn-wrapper'>
        <div className='container'>
          <Link
            className='cart-btn btn btn_lg'
            to='/cart/'
          >
            <span>
              {getLang('basket')} <span className='cart-btn__count'>{cartBtnData.quantity}</span>
            </span>

            <span>{cartBtnData.amount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></span>
          </Link>
        </div>
      </div>

      <div className='cart-btn-placeholder'></div>
    </>
  )
}

export default CartBtn