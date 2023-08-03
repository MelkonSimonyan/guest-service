import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLang } from '../../hooks/useLang'
import { selectInit } from '../../features/init/initSlice'
import { selectUser } from '../../features/user/userSlice'
import API from '../../API/API'
import { useFetching } from '../../hooks/useFetching'

const CartTotal = ({
  cart,
  store,
  service,
  total,
  setTotal,
  cartType,
  bonusesSelected,
  setBonusesSelected,
}) => {
  const getLang = useLang()
  const { userData } = useSelector(selectUser)
  const { initData } = useSelector(selectInit)

  const [fetchBonuses, isBonusesLoading, bonusesError] = useFetching(async () => {
    const response = await API.getBonuses({
      cart: cart ? cart : [service],
      type: cartType,
      storeId: store?.storeId,
      bonuses: bonusesSelected,
    })
    
    let fee = store ? store.serviceFee : service.serviceFee

    setTotal({
      addBonuses: response.data.addBonuses,
      bonuses: response.data.bonuses,
      discount: response.data.discount,
      amount: response.data.order,
      amountWithFee: response.data.amount,
      fee:
        !fee ? null :
          fee.type === 'percent' ?
            fee.value + ' %' :
            fee.value + '&nbsp;' + initData.currencies[initData.currency].symbol,
    })
  })

  useEffect(() => {
    fetchBonuses()
  }, [cart, service, bonusesSelected])

  if (!isBonusesLoading && !total?.amount) {
    return null
  }

  return (
    <div className='cart__data'>
      {isBonusesLoading ? 
        <div className='loader'></div>
      : null}
      
      {userData?.bonusesActive ?
        <>
          <div className='form-check' style={{marginTop: 0}}>
            <label className='form-check__label'>
              <input 
                type='checkbox'
                className='form-check__input'
                onChange={(e) => {
                  localStorage.setItem('bonusesSelected', e.target.checked)
                  setBonusesSelected(e.target.checked)
                }}
                checked={bonusesSelected}
              />
              <span className='form-check__text'>{getLang('ts_write_bonuses')} {total?.bonuses}</span>
            </label>
          </div>

          <div className='cart__data-row _bonus'>
            <div className='cart__data-title'>{getLang('ts_accrue_bonuses')}</div>
            <div className='cart__data-value'>{total?.addBonuses}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
          </div>
        </> : null
      }

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

      {total?.discount ?
        <div className='cart__data-row'>
          <div className='cart__data-title'>{getLang('discount')}</div>
          <div className='cart__data-value'>-{total?.discount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
        </div> : null
      }

      <div className='cart__data-row _total'>
        <div className='cart__data-title'>{getLang('amount')}</div>
        <div className='cart__data-value'>{total?.amountWithFee}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
      </div>
    </div>
  )
}

export default CartTotal