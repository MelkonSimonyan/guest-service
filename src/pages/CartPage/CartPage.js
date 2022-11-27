import './CartPage.css'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { useLang } from '../../hooks/useLang'

import CartStore from '../../components/CartStore/CartStore'
import CartService from '../../components/CartService/CartService'

const CartPage = () => {
  const getLang = useLang()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [cartType, setCartType] = useState(null)

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'cart',
      pageTitle: getLang('basket'),
      parentLink: window.history.state?.key ? -1 : '/'
    }))
  }, [])

  useEffect(() => {
    if (searchParams.get('serviceId')) {
      setCartType('service')
    } else {
      setCartType('store')
    }
  }, [searchParams])

  if (!cartType) {
    return null
  }

  return (
    <div className='content'>
      <div className='container'>
        {cartType === 'store' ?
          <CartStore /> :
          cartType === 'service' ?
            <CartService /> : null
        }
      </div>
    </div>
  )
}

export default CartPage