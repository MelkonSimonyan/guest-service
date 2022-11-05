import './CartService.css'

import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { selectInit } from '../../features/init/initSlice'
import { useLang } from '../../hooks/useLang'
import CartServiceItem from '../../components/CartItem/CartServiceItem'
import CartForm from '../../components/CartForm/CartForm'
import { getService } from '../../utils/getService'
import CartEmpty from '../CartEmpty/CartEmpty'

const CartService = () => {
  const { initData } = useSelector(selectInit)
  const [searchParams] = useSearchParams()
  const getLang = useLang()
  const [serviceData, setServiceData] = useState(null)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    let serviceId = searchParams.get('shopId')

    if (serviceId) {
      let currentServiceData = getService(initData.pages, serviceId)
      setServiceData(currentServiceData)
    }
  }, [searchParams])

  useEffect(() => {
    if (serviceData) {
      let amount = serviceData.services.price
      setAmount(amount)
    }
  }, [serviceData])

  const serviceFee = useMemo(() => {
    if (!isNaN(amount)) {
      return amount * 10 / 100
    }
    return null
  }, [amount])

  if (!serviceData) {
    return (
      <div className='cart'>
        <CartEmpty />
      </div>
    )
  }

  return (
    <div className='cart'>
      {/* <div className='cart__head-note'>Примерное время ожидания - 15 мин</div> */}

      <div className='cart__list'>
        <CartServiceItem item={serviceData} remove={() => {
          setServiceData(null)
        }} />
      </div>

      <div className='cart__data'>
        <div className='cart__data-row'>
          <div className='cart__data-title'>{getLang('order_cost')}</div>
          <div className='cart__data-value'>{amount}&nbsp;{initData.hotel.currency}</div>
        </div>

        {serviceFee ? <>
          <div className='cart__data-row'>
            <div className='cart__data-title'>{getLang('service_fee')}</div>
            <div className='cart__data-value'>{serviceFee}&nbsp;{initData.hotel.currency}</div>
          </div>

          <div className='cart__data-row _total'>
            <div className='cart__data-title'>{getLang('total')}</div>
            <div className='cart__data-value'>{Number(amount) + serviceFee}&nbsp;{initData.hotel.currency}</div>
          </div>
        </> : null}
      </div>

      <CartForm />
    </div>
  )
}

export default CartService