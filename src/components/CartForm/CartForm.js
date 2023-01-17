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
import { getStore } from '../../utils/getStore'
import { isClose } from '../../utils/isClose'

const CartForm = ({
  cart,
  type,
  storeId,
  waitTime,
  noTime,
  noPersons,
  maxDaysDelivery,
  hidePrice,
  setError,
  setSuccess,
  setHasRemovedItems,
}) => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const textareaRef = useRef(null)
  const recaptchaRef = useRef()
  const { initData } = useSelector(selectInit)
  const [textareaValue, setTextareaValue] = useState('')
  const [person, setPerson] = useState(1)
  const [payMethod, setPayMethod] = useState({})
  const [time, setTime] = useState((new Date()).getTime())
  const [orderData, setOrderData] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (noTime) {
      setTime('')
    }

    setPayMethod(initData.payMethods[0].id)
  }, [])

  useEffect(() => {
    textareaRef.current.rows = 2
    textareaRef.current.rows = parseInt((textareaRef.current.scrollHeight - 22) / 20)
  }, [textareaValue])

  const [fetchOrder, isOrderLoading, orderError] = useFetching(async (data) => {
    localStorage.setItem('formDataRoom', data.room)
    localStorage.setItem('formDataName', data.name)
    localStorage.setItem('formDataPhone', data.phone)

    let removedItem = 0

    for (let item of cart) {
      let store = getStore(initData.pages, item.storeId)
      let category = store.categories.find(cat => cat.id === item.categoryId)

      if (category.category_id > 0) {
        category = store.categories.find(cat => cat.id === category.category_id)
      }

      if ((store.storeWorkTime && isClose(store.storeWorkTime.from, store.storeWorkTime.to)) || (category.storeWorkTime && isClose(category.storeWorkTime.from, category.storeWorkTime.to))) {
        removedItem++

        dispatch(removeFromCart({
          id: item.id,
          storeId: item.storeId
        }))
      }
    }

    if (removedItem) {
      setHasRemovedItems(true)
    } else {
      const token = await recaptchaRef.current.executeAsync()

      const response = await API.order({
        ...data,
        type,
        storeId,
        cart,
        person,
        payMethod,
        time,
        text: textareaValue,
        recaptcha: token,
      })

      setOrderData(response.data)
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
              setTime={setTime}
              waitTime={((waitTime || initData.waitTime) * 60 * 1000) || 0}
              noTime={noTime}
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
              <button type='submit' className='cart__btn btn btn_lg'>{getLang('acceptOrder')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-btn-placeholder'></div>
    </form>
  )
}

export default CartForm