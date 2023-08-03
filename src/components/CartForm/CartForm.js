import './CartForm.css'

import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { selectInit } from '../../features/init/initSlice'
import { removeFromCart } from '../../features/cart/cartSlice'

import API from '../../API/API'
import { useLang } from '../../hooks/useLang'
import { useFetching } from '../../hooks/useFetching'

import NumberControl from '../NumberControl/NumberControl'
import Timepicker from '../Timepicker/Timepicker'
import { isClose } from '../../utils/isClose'

const CartForm = ({
  cart,
  store,
  time,
  asap,
  total,
  close,
  setTime,
  noTime,
  cartType,
  waitTime,
  setError,
  noPersons,
  hidePrice,
  setSuccess,
  storeWorkTime,
  maxDaysDelivery,
  bonusesSelected,
  setHasRemovedItems,
  setMinOrderSumAlert,
}) => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const textareaRef = useRef(null)
  const recaptchaRef = useRef()
  const { initData } = useSelector(selectInit)
  const [textareaValue, setTextareaValue] = useState(localStorage.getItem('formDataText') || '')
  const [person, setPerson] = useState(1)
  const [payMethods, setPayMethods] = useState(cartType === 'store' && cart[0]?.payMethods ? cart[0].payMethods : store?.payMethods ? store.payMethods : initData.payMethods)
  const [payMethod, setPayMethod] = useState(payMethods[0].id)
  const [orderData, setOrderData] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    textareaRef.current.rows = 2
    textareaRef.current.rows = parseInt((textareaRef.current.scrollHeight - 22) / 20)
  }, [textareaValue])

  const [fetchOrder, isOrderLoading, orderError] = useFetching(async (data) => {
    console.log(data)
    if (!close) {
      localStorage.setItem('formDataRoom', data.room)
      localStorage.setItem('formDataName', data.name)
      localStorage.setItem('formDataPhone', data.phone)
      localStorage.setItem('formDataText', textareaValue)

      let closedItemCount = 0

      if (cartType === 'store') {
        const closedItems = document.querySelectorAll('.cart-item.is-closed')
        closedItemCount = closedItems.length
      }

      if (closedItemCount > 0) {
        setHasRemovedItems(true)
      } else if (store?.minOrderSum && total.amountWithFee < store.minOrderSum) {
        setMinOrderSumAlert(true)
      } else {
        let token = ''

        if (initData.recaptchaKey) {
          token = await recaptchaRef.current.executeAsync()
        }

        const response = await API.order({
          ...data,
          cart,
          person,
          payMethod,
          time,
          type: cartType,
          storeId: store?.storeId,
          text: textareaValue,
          recaptcha: token,
          bonuses: bonusesSelected,
        })

        setOrderData(response.data)
      }
    }
  })

  useEffect(() => {
    if (orderData?.success) {
      setSuccess(orderData)
    } else if (orderError || orderData?.pay?.error) {
      setError(orderError || orderData?.pay?.error)
    }
  }, [orderError, orderData])

  return (
    <form onSubmit={handleSubmit(fetchOrder)}>
      {isOrderLoading && (
        <div className='loader'></div>
      )}

      {!noPersons ?
        <div className='cart__row'>
          <div className='cart__row-label'>{getLang('persons')}</div>

          <div className='cart__row-content'>
            <NumberControl
              value={person}
              decrease={() => {
                setPerson((count) => count > 1 ? count - 1 : count)
              }}
              increase={() => {
                setPerson((count) => count + 1)
              }}
            />
          </div>
        </div> : null
      }

      {!noTime ?
        <div className='cart__row'>
          <div className='cart__row-label'>{getLang('deliveryTime')}</div>

          <div className='cart__row-content'>
            <Timepicker
              time={time}
              asap={asap}
              setTime={setTime}
              waitTime={((waitTime || initData.waitTime) * 60 * 1000) || 0}
              noTime={noTime}
              availableTime={storeWorkTime}
              maxDaysDelivery={maxDaysDelivery || initData.maxDaysDelivery}
            />
          </div>
        </div> : null
      }

      {!hidePrice ?
        <div className='cart__row'>
          <div className='cart__row-label'>{getLang('payment')}</div>

          <div className='cart__row-content'>
            <div className='btn-list'>
              {payMethods.map(method => (
                <button
                  type='button'
                  key={method.id}
                  className={`btn-list__btn btn ${payMethod === method.id ? '' : 'btn_secondary'}`}
                  onClick={() => {
                    setPayMethod(method.id)
                  }}
                >
                  <span>{method.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        : null
      }

      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('numRoom')}</div>
        <div className='form-group'>
          <select
            {...register('room', {
              required: true
            })}
            className={'form-select' + (errors.room ? ' error' : '')}
            defaultValue={localStorage.getItem('formDataRoom')}
          >
            <option value=''></option>
            {initData.rooms.map(room => (
              <option
                value={room.id}
                key={room.id}
              >{room.name}</option>
            ))}
          </select>
          {errors.room && <div className='form-error'>{getLang('formErrorRequired')}</div>}
        </div>
      </div>

      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('contacts')}</div>

        <div className='cart__row-content'>
          <div className='form-group form-floating'>
            <input
              {...register('name', {
                required: true
              })}
              type='text'
              autoComplete='off'
              placeholder='&nbsp;'
              className={'form-control _required' + (errors.name ? ' error' : '')}
              defaultValue={localStorage.getItem('formDataName') || ''}
            />
            <label className='form-label'>{getLang('formClientName')}</label>
            {errors.name && <div className='form-error'>{getLang('formErrorRequired')}</div>}
          </div>

          <div className='form-group form-floating'>
            <input 
              {...register('phone', {
                required: true
              })}
              type='tel'
              autoComplete='off'
              placeholder='&nbsp;'
              className={'form-control _required' + (errors.phone ? ' error' : '')}
              defaultValue={localStorage.getItem('formDataPhone') || ''}
            />
            <label className='form-label'>{getLang('formPhone')}</label>
            {errors.phone && <div className='form-error'>{getLang('formErrorRequired')}</div>}
          </div>

          <div className='form-group form-floating'>
            <textarea
              {...register('text')}
              placeholder='&nbsp;'
              className='form-control'
              value={textareaValue}
              ref={textareaRef}
              rows='2'
              onChange={(e) => {
                setTextareaValue(e.target.value)
              }}
            ></textarea>
            <label className='form-label'>{getLang('formComment')}</label>
          </div>

          {initData.hotel.legacyLink ? <div className='form-check'>
            <label className='form-check__label'>
              <input
                {...register('aggreement', {
                  required: true
                })}
                type='checkbox'
                className={'form-check__input' + (errors.aggreement ? ' error' : '')}
                defaultChecked
              />
              <span className='form-check__text' dangerouslySetInnerHTML={{ __html: getLang('legacyPhrase').replace(':link:', initData.hotel.legacyLink) }} />
            </label>
            {errors.aggreement && <div className='form-error' style={{ position: 'relative', top: '5px' }}>{getLang('formErrorRequired')}</div>}
          </div> : null}
        </div>
      </div>

      {initData.recaptchaKey ?
        <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={initData.recaptchaKey} /> :
        null
      }

      <div className='footer-btn-wrapper'>
        <div className='container'>
          <div className='footer-btn-row'>
            <div className='footer-btn-col'>
              <button type='submit' className='btn btn_lg' disabled={close}>{getLang('acceptOrder')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-btn-placeholder'></div>
    </form>
  )
}

export default CartForm