import './CartPage.css'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { useLang } from '../../hooks/useLang'
import { getStore } from '../../utils/getStore'
import { getService } from '../../utils/getService'

import Cart from '../../components/Cart/Cart'

const CartPage = () => {
  const getLang = useLang()
  const dispatch = useDispatch()
  const params = useParams()
  const [searchParams] = useSearchParams()
  const { initData } = useSelector(selectInit)
  const [cartType, setCartType] = useState('')
  const [store, setStore] = useState(null)
  const [service, setService] = useState(null)

  useEffect(() => {
    let store
    let service

    if (params.id) {
      store = getStore(initData.pages, params.id)
      setStore(store)
      setCartType('store')
    } else if (searchParams.get('serviceId')) {
      service = getService(initData.pages, searchParams.get('serviceId'))
      setService(service)
      setCartType('service')
    }

    dispatch(setPageInfo({
      pageId: 'cart',
      pageTitle: store?.title || service?.title || getLang('basket'),
      parentLink: window.history.state?.key ? -1 : '/'
    }))
  }, [])

  if (!cartType) {
    return null
  }

  return (
    <div className='content'>
      <div className='container'>
        <Cart
          cartType={cartType}
          store={store}
          service={service}
        />
      </div>
    </div>
  )
}

export default CartPage