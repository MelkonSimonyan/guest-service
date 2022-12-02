import './CartBtn.css'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectInit } from '../../features/init/initSlice'
import { selectPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectCart } from '../../features/cart/cartSlice'

import { useLang } from '../../hooks/useLang'
import { getItem } from '../../utils/getItem'
import { getStore } from '../../utils/getStore'

const CartBtn = () => {
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const { pageId } = useSelector(selectPageInfo)
  const { carts } = useSelector(selectCart)
  const [cartBtnData, setCartBtnData] = useState([])
  const [cartBtnVisible, setCartBtnVisible] = useState(0)

  useEffect(() => {
    if (carts.length) {
      let cartBtnData = []
      let cartBtnVisible = 0

      carts.forEach(cart => {
        const storeId = cart.storeId
        const products = cart.products
        const store = getStore(initData.pages, storeId)

        let quantity = 0
        let amount = 0

        products.forEach(product => {
          quantity += product.quantity
          amount += product.quantity * getItem(initData.pages, product.id, product.storeId).price
        })

        if (store.fee) {
          amount = store.fee.type === 'percent' ? amount + amount * store.fee.value / 100 : amount + store.fee.value
        }

        if (quantity) {
          cartBtnVisible++
        }

        cartBtnData.push({
          storeTitle: store.title,
          storeId,
          quantity,
          amount
        })
      })

      setCartBtnData(cartBtnData)
      setCartBtnVisible(cartBtnVisible)
    }
  }, [carts])

  if ((pageId === 'cart' || pageId === 'feedback') || !cartBtnVisible) {
    return null
  }

  return (
    <>
      <div className='footer-btn-wrapper'>
        <div className='container'>
          <div className='footer-btn-row'>
            {cartBtnData.map((btnData) => (
              !btnData.quantity ? null :
                <div
                  key={btnData.storeId}
                  className='footer-btn-col'
                >
                  <Link
                    className='cart-btn btn btn_lg'
                    to={'/cart/' + btnData.storeId}
                  >
                    <span className='cart-btn__content'>
                      <span className='cart-btn__title'>{btnData.storeTitle || getLang('basket')}</span>
                      <span className='cart-btn__count'>{btnData.quantity}</span>
                    </span>

                    <span className='cart-btn__amount'>{btnData.amount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></span>
                  </Link>
                </div>
            ))}
          </div>
        </div>
      </div>
      <div className='footer-btn-placeholder'></div>
    </>
  )
}

export default CartBtn