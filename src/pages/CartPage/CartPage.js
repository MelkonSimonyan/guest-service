import './CartPage.css'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { useLang } from '../../hooks/useLang'
import { getStore } from '../../utils/getStore'
import { getService } from '../../utils/getService'

import CartService from '../../components/Cart/CartService'
import CartStore from '../../components/Cart/CartStore'

const CartPage = () => {
  const getLang = useLang()
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { initData } = useSelector(selectInit)

  const [store, setStore] = useState(null)
  const [service, setService] = useState(null)
  const [cartType, setCartType] = useState(null)

  useEffect(() => {
    let store
    let service

    if (params.id) {
      store = getStore(initData.pages, params.id)

      if (store) {
        setCartType('store')
        setStore(store)
      }
    } else if (searchParams.get('serviceId')) {
      service = getService(initData.pages, searchParams.get('serviceId'))

      if (service) {
        setCartType('service')
        setService(service)
      }
    }

    if (!store && !service) {
      navigate('/')
    } else {
      dispatch(setPageInfo({
        pageId: 'cart',
        pageTitle: store?.title || service?.title || getLang('basket'),
        parentLink: window.history.state?.key ? -1 : '/'
      }))
    }
  }, [])

  return (
    <div className='content'>
      <div className='container'>
        {cartType === 'store' ?
          <CartStore store={store} /> :
          cartType === 'service' ?
            <CartService service={service} /> :
            null
        }
      </div>
    </div>
  )
}

export default CartPage