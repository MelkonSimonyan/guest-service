import './Cart.css'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CartServiceItem from '../CartItem/CartServiceItem'
import CartForm from '../CartForm/CartForm'
import CartTotal from './CartTotal'
import CartError from './CartError'
import { isClose } from '../../utils/isClose'
import { useLang } from '../../hooks/useLang'
import { FiAlertTriangle } from 'react-icons/fi'

const CartService = ({ service }) => {
  const getLang = useLang()
  const navigate = useNavigate()

  const [time, setTime] = useState(service.noTime ? '' : (new Date()).getTime())
  const [total, setTotal] = useState(null)
  const [asap, setAsap] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [close, setClose] = useState(false)
  const [bonusesSelected, setBonusesSelected] = useState(localStorage.getItem('bonusesSelected') === 'true' ? true : false)

  useEffect(() => {
    if (service.storeWorkTime && isClose(service.storeWorkTime.from, service.storeWorkTime.to, time)) {
      setAsap(false)
      setClose(service.noWorkMessage || getLang('noWorkMessage'))
    } else {
      setClose(false)
    }
  }, [time])

  useEffect(() => {
    if (success) {
      localStorage.setItem('orderRedirect', 'true')
      navigate('/order/' + success.orderId)
    }
  }, [success])

  if (error) {
    return (
      <CartError error={error} />
    )
  }

  return (
    <div className='cart'>
      {close ?
        <div className='close-message'>
          <FiAlertTriangle />
          <div>{close}</div>
        </div> : null
      }

      <div className='cart__list'>
        <CartServiceItem item={service} />
      </div>

      <CartTotal
        service={service}
        total={total}
        setTotal={setTotal}
        cartType={'service'}
        bonusesSelected={bonusesSelected}
        setBonusesSelected={setBonusesSelected}
      />

      <CartForm
        cart={[service]}
        time={time}
        asap={asap}
        close={close}
        setTime={setTime}
        noTime={service.noTime}
        cartType={'service'}
        waitTime={service.waitTime}
        setError={setError}
        noPersons={service.noPersons}
        hidePrice={total?.amount ? false : true}
        setSuccess={setSuccess}
        storeWorkTime={service.storeWorkTime}
        maxDaysDelivery={service.maxDaysDelivery}
        bonusesSelected={bonusesSelected}
      />
    </div>
  )
}

export default CartService