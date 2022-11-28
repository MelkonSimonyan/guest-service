import './CartBtn.css'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectInit } from '../../features/init/initSlice'
import { selectPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectCart } from '../../features/cart/cartSlice'

import { useLang } from '../../hooks/useLang'
import { getItem } from '../../utils/getItem'

const CartBtn = () => {
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const { pageId } = useSelector(selectPageInfo)
  const { carts } = useSelector(selectCart)
  const [cartBtnData, setCartBtnData] = useState([])

  useEffect(() => {
    if (carts.length) {
      let cartBtnData = []

      carts.forEach(cart => {
        const storeId = cart.storeId
        const products = cart.products

        let quantity = 0
        let amount = 0

        products.forEach(product => {
          quantity += product.quantity
          amount += product.quantity * getItem(initData.pages, product.id, product.storeId).price
        })

        cartBtnData.push({
          storeId,
          quantity,
          amount
        })
      })

      setCartBtnData(cartBtnData)
    }
  }, [carts])

  /* useEffect(() => {
    if (cartBtnData.length) {
      console.log(cartBtnData)
    }
  }, [cartBtnData]) */

  /* if (!cartBtnData.quantity || pageId === 'cart') {
    return null
  } */

  return (
    <>
      <div className='cart-btn-wrapper'>
        <div className='container'>
          {cartBtnData.map((btnData) => (
            <Link
              className='cart-btn btn btn_lg'
              key={btnData.storeId}
              to={'/cart/' + btnData.storeId}
            >
              <span>
                {getLang('basket')} <span className='cart-btn__count'>{btnData.quantity}</span>
              </span>

              <span>{btnData.amount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></span>
            </Link>
          ))}
        </div>
      </div>

      <div className='cart-btn-placeholder'></div>
    </>
  )
}

export default CartBtn