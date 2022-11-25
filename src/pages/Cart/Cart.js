import './Cart.css'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { useLang } from '../../hooks/useLang'
import CartOrder from '../../components/CartOrder/CartOrder'
import CartService from '../../components/CartService/CartService'

const Cart = () => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const [searchParams] = useSearchParams()
  const [cartType, setCartType] = useState(null)

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'cart',
      pageTitle: getLang('basket'),
      parentLink: window.history.state && window.history.state.key ? -1 : '/'
    }))
  }, [])

  useEffect(() => {
    if (searchParams.get('shopId')) {
      setCartType('service')
    } else {
      setCartType('store')
    }
  }, [searchParams])

  return (
    <div className='content'>
      <div className='container'>
        {!cartType
          ? null
          : cartType === 'store'
            ? <CartOrder />
            : cartType === 'service'
              ? <CartService />
              : null
        }
      </div>
    </div>
  )
}

export default Cart