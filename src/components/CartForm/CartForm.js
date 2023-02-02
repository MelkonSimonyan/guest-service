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
  setHasRemovedItems,
}) => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const textareaRef = useRef(null)
  const recaptchaRef = useRef()
  const { initData } = useSelector(selectInit)
  const [textareaValue, setTextareaValue] = useState('')
  const [person, setPerson] = useState(1)
  const [payMethod, setPayMethod] = useState(initData.payMethods[0].id)
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
    if (!close) {
      localStorage.setItem('formDataRoom', data.room)
      localStorage.setItem('formDataName', data.name)
      localStorage.setItem('formDataPhone', data.phone)

      let closedItemCount = 0

      if (cartType === 'store') {
        const closedItems = document.querySelectorAll('.cart-item.is-closed')
        closedItemCount = closedItems.length
      }

      if (closedItemCount > 0) {
        setHasRemovedItems(true)
      } else {
        const token = await recaptchaRef.current.executeAsync()

        const response = await API.order({
          ...data,
          cart,
          person,
          payMethod,
          time,
          type: cartType,
          storeId: store.storeId,
          text: textareaValue,
          recaptcha: token,
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
        <div className='loader _fix'></div>
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
              {initData.payMethods.map(method => (
                <button
                  type='button'
                  key={method.id}
                  className={`btn-list__btn btn ${payMethod === method.id ? '' : 'btn_secondary'}`}
                  onClick={() => {
                    setPayMethod(method.id)
                  }}
                >
                  <span style={{ maxWidth: '9em' }}>{method.name}</span>
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
          <select {...register('room', { required: true })} className={'form-select' + (errors.room ? ' error' : '')} defaultValue={localStorage.getItem('formDataRoom')}>
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

      <div className='cart__row' style={{ marginBottom: '-15px' }}>
        <div className='cart__row-label'>{getLang('contacts')}</div>

        <div className='cart__row-content'>
          <div className='form-group form-floating'>
            <input {...register('name', { required: true })} type='text' placeholder='&nbsp;' className={'form-control _required' + (errors.name ? ' error' : '')} autoComplete='off' defaultValue={localStorage.getItem('formDataName') || ''} />
            <label className='form-label'>{getLang('formClientName')}</label>
            {errors.name && <div className='form-error'>{getLang('formErrorRequired')}</div>}
          </div>

          <div className='form-group form-floating'>
            <input {...register('phone', { required: true })} type='text' placeholder='&nbsp;' className={'form-control _required' + (errors.phone ? ' error' : '')} autoComplete='off' defaultValue={localStorage.getItem('formDataPhone') || ''} />
            <label className='form-label'>{getLang('formPhone')}</label>
            {errors.phone && <div className='form-error'>{getLang('formErrorRequired')}</div>}
          </div>

          <div className='form-group form-floating'>
            <textarea
              placeholder='&nbsp;'
              className='form-control'
              {...register('text')}
              value={textareaValue}
              ref={textareaRef}
              rows='2'
              onChange={(e) => {
                setTextareaValue(e.target.value)
              }}
            ></textarea>
            <label className='form-label'>{getLang('formComment')}</label>
          </div>
        </div>
      </div>

      <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={initData.recaptchaKey} />

      <div className='footer-btn-wrapper'>
        <div className='container'>
          <div className='footer-btn-row'>
            <div className='footer-btn-col'>
              <button type='submit' className='cart__btn btn btn_lg' disabled={close}>{getLang('acceptOrder')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-btn-placeholder'></div>
    </form>
  )
}

export default CartForm