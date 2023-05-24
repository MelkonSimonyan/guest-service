import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLang } from '../../hooks/useLang'
import { selectInit } from '../../features/init/initSlice'

const CartTotal = ({
  cart,
  store,
  service,
  total,
  setTotal,
}) => {
  const getLang = useLang()
  const { initData } = useSelector(selectInit)

  useEffect(() => {
    let amount = 0
    let fee

    if (store) {
      cart?.forEach(cartProduct => {
        amount += cartProduct.quantity * cartProduct.price
      })
      fee = store.serviceFee
    } else if (service) {
      amount = service.service.price
      fee = service.serviceFee
    }

    setTotal({
      amount,
      fee:
        !fee ? null :
          fee.type === 'percent' ?
            fee.value + ' %' :
            fee.value + '&nbsp;' + initData.currencies[initData.currency].symbol,
      amountWithFee:
        !fee ? amount :
          fee.type === 'percent' ?
            amount + amount * fee.value / 100 :
            amount + fee.value
    })
  }, [cart, service])

  if (!total?.amount) {
    return null
  }

  return (
    <div className='cart__data'>
      {total?.fee ?
        <>
          <div className='cart__data-row'>
            <div className='cart__data-title'>{getLang('orderPrice')}</div>
            <div className='cart__data-value'>{total?.amount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
          </div>

          <div className='cart__data-row'>
            <div className='cart__data-title'>{getLang('serviceFee')}</div>
            <div className='cart__data-value'><span dangerouslySetInnerHTML={{ __html: total?.fee }} /></div>
          </div>
        </> : null
      }

      <div className='cart__data-row _total'>
        <div className='cart__data-title'>{getLang('amount')}</div>
        <div className='cart__data-value'>{total?.amountWithFee}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
      </div>
    </div>
  )
}

export default CartTotal