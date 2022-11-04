import './CartForm.css'

import React, { useEffect, useState, useRef } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import NumberControl from '../NumberControl/NumberControl'
import { useLang } from '../../hooks/useLang'
import Timepicker from '../Timepicker/Timepicker'

const CartForm = () => {
  const textareaRef = useRef(null)
  const getLang = useLang()
  const [textareaValue, setTextareaValue] = useState('')
  const [personsCount, setPersonsCount] = useState(1)
  const [time, setTime] = useState(
    /* 1667703900000 */
    (new Date()).getTime()
  )

  useEffect(() => {
    textareaRef.current.rows = 2
    textareaRef.current.rows = parseInt((textareaRef.current.scrollHeight - 22) / 20)
  }, [textareaValue])

  return (
    <>
      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('number_persons')}</div>

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
        <div className='cart__row-label'>{getLang('delivery_time')}</div>

        <div className='cart__row-content'>
          <Timepicker time={time} setTime={setTime} waitTime={60 * 60 * 1000} />
        </div>
      </div>

      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('hotel_stay')}</div>

        <div className='cart__row-content'>
          <div className='btn-group'>
            <button type='button' className='btn-group__btn btn'>{getLang('hotel_guest')}</button>
            <button type='button' className='btn-group__btn btn btn_secondary'>{getLang('not_hotel_guest')}</button>
          </div>
        </div>
      </div>

      <div className='cart__row'>
        <div className='cart__row-label'>{getLang('payment_method')}</div>

        <div className='cart__row-content'>
          <div className='btn-list'>
            <button
              type='button'
              className='btn-list__arrow _prev'
            ><MdChevronLeft /></button>

            <div className='btn-list__scroll'>
              <div className='btn-list__list'>
                <button type='button' className='btn-list__btn btn' dangerouslySetInnerHTML={{ __html: getLang('guest_account') }} />
                <button type='button' className='btn-list__btn btn btn_secondary' dangerouslySetInnerHTML={{ __html: getLang('pay_online') }} />
                <button type='button' className='btn-list__btn btn btn_secondary' dangerouslySetInnerHTML={{ __html: getLang('card_upon_receipt') }} />
                <button type='button' className='btn-list__btn btn btn_secondary' dangerouslySetInnerHTML={{ __html: getLang('cash') }} />
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
        <div className='cart__row-label'>{getLang('contact_details')}</div>

        <div className='cart__row-content'>
          <div className='form-group form-floating'>
            <input type='text' placeholder='&nbsp;' className='form-control' required />
            <label className='form-label'>{getLang('room_number')}</label>
          </div>

          <div className='form-group form-floating'>
            <input type='text' placeholder='&nbsp;' className='form-control' required />
            <label className='form-label'>{getLang('surname_latin')}</label>
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
            <label className='form-label'>{getLang('other_wishes')}</label>
          </div>
        </div>
      </div>

      <div className='cart__btn-row'>
        <button type='button' className='cart__btn btn btn_lg'>{getLang('confirm_order')}</button>
      </div>
    </>
  )
}

export default CartForm