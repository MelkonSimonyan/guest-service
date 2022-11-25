import './CartForm.css'

import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { selectInit } from '../../features/init/initSlice'
import NumberControl from '../NumberControl/NumberControl'
import { useLang } from '../../hooks/useLang'
import Timepicker from '../Timepicker/Timepicker'

const CartForm = () => {
  const textareaRef = useRef(null)
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const [textareaValue, setTextareaValue] = useState('')
  const [personsCount, setPersonsCount] = useState(1)
  const [payMethod, setPayMethod] = useState({})
  const [time, setTime] = useState(
    /* 1667703900000 */
    (new Date()).getTime()
  )

  useEffect(() => {
    setPayMethod(initData.payMethods[0].id)
  }, [])

  useEffect(() => {
    textareaRef.current.rows = 2
    textareaRef.current.rows = parseInt((textareaRef.current.scrollHeight - 22) / 20)
  }, [textareaValue])

  return (
    <>
      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('persons')}</div>

        <div className='cart__row-content'>
          <NumberControl
            value={personsCount}
            decrease={() => {
              setPersonsCount((count) => count > 1 ? count - 1 : count)
            }}
            increase={() => {
              setPersonsCount((count) => count + 1)
            }}
          />
        </div>
      </div>

      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('deliveryTime')}</div>

        <div className='cart__row-content'>
          <Timepicker time={time} setTime={setTime} waitTime={60 * 60 * 1000} />
        </div>
      </div>

      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('payment')}</div>

        <div className='cart__row-content'>
          <div className='btn-list'>
            <button
              type='button'
              className='btn-list__arrow _prev'
            ><MdChevronLeft /></button>

            <div className='btn-list__scroll'>
              <div className='btn-list__list'>
                {initData.payMethods.map(method => (
                  <button
                    type='button'
                    className={`btn-list__btn btn ${payMethod === method.id ? '' : 'btn_secondary'}`}
                    onClick={() => {
                      setPayMethod(method.id)
                    }}
                  >{method.name}</button>
                ))}
              </div>
            </div>

            <button
              type='button'
              className='btn-list__arrow _next'
            ><MdChevronRight /></button>
          </div>
        </div>
      </div>

      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('contacts')}</div>

        <div className='cart__row-content'>
          <div className='form-group form-floating'>
            <input type='text' placeholder='&nbsp;' className='form-control' required />
            <label className='form-label'>{getLang('numRoom')}</label>
          </div>

          <div className='form-group form-floating'>
            <input type='text' placeholder='&nbsp;' className='form-control' required />
            <label className='form-label'>{getLang('formClientName')}</label>
          </div>

          <div className='form-group form-floating'>
            <input type='text' placeholder='&nbsp;' className='form-control' required />
            <label className='form-label'>{getLang('formPhone')}</label>
          </div>

          <div className='form-group form-floating'>
            <textarea
              placeholder='&nbsp;'
              className='form-control has-scrollbar'
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

      <div className='cart__btn-row'>
        <button type='button' className='cart__btn btn btn_lg'>{getLang('acceptOrder')}</button>
      </div>
    </>
  )
}

export default CartForm