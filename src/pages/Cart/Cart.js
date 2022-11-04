import './Cart.css'

import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdChevronLeft, MdChevronRight, MdOutlineAccessTime } from 'react-icons/md';
import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectCart } from '../../features/cart/cartSlice'
import { useLang } from '../../hooks/useLang'
import CartItem from '../../components/CartItem/CartItem';

const Cart = () => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const textareaRef = useRef(null)
  const { initData } = useSelector(selectInit)
  const { cartProducts } = useSelector(selectCart)
  const [textareaValue, setTextareaValue] = useState('')

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'cart',
      pageTitle: getLang('cart'),
      parentLink: window.history.state && window.history.state.key ? -1 : '/'
    }))
  }, [])

  useEffect(() => {
    textareaRef.current.rows = 2
    textareaRef.current.rows = parseInt((textareaRef.current.scrollHeight - 22) / 20)
  }, [textareaValue])

  return (
    <div className='content'>
      <div className='container'>
        <div className='cart'>
          <div className='cart__head-note'>Примерное время ожидания - 15 мин</div>

          <div className='cart__list'>
            {cartProducts.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          <div className='cart__data'>
            <div className='cart__data-row'>
              <div className='cart__data-title'>Стоимость заказа</div>
              <div className='cart__data-value'>7,00 $</div>
            </div>

            <div className='cart__data-row'>
              <div className='cart__data-title'>Сервисный сбор</div>
              <div className='cart__data-value'>5,00 $</div>
            </div>

            <div className='cart__data-row _total'>
              <div className='cart__data-title'>Итого</div>
              <div className='cart__data-value'>12,00 $</div>
            </div>
          </div>

          <div className='cart__row'>
            <div className='cart__row-label'>Количество персон</div>

            <div className='cart__row-content'>
              <div className='number-control'>
                <button type='button' className='number-control__btn _decrease'></button>
                <span className='number-control__value'>1</span>
                <button type='button' className='number-control__btn _increase'></button>
              </div>
            </div>
          </div>

          <div className='cart__row'>
            <div className='cart__row-label'>Время доставки</div>

            <div className='cart__row-content'>
              <div className='timepicker'>
                <button type='button' className='timepicker__label btn btn_secondary'>
                  <span className='timepicker__label-icon'>
                    <MdOutlineAccessTime />
                  </span>
                  <span className='timepicker__label-text'>Чт 03 ноя., 07:00</span>
                  <span className='timepicker__label-arrow'>
                    <MdChevronRight />
                  </span>
                </button>
                <div className='timepicker__dropdown'></div>
              </div>
            </div>
          </div>

          <div className='cart__row'>
            <div className='cart__row-label'>Проживание в отеле</div>

            <div className='cart__row-content'>
              <div className='btn-group'>
                <button type='button' className='btn-group__btn btn'>Я гость отеля</button>
                <button type='button' className='btn-group__btn btn btn_secondary'>Я не гость отеля</button>
              </div>
            </div>
          </div>

          <div className='cart__row'>
            <div className='cart__row-label'>Способ оплаты</div>

            <div className='cart__row-content'>
              <div className='btn-list'>
                <button
                  type='button'
                  className='btn-list__arrow _prev'
                ><MdChevronLeft /></button>

                <div className='btn-list__scroll'>
                  <div className='btn-list__list'>
                    <button type='button' className='btn-list__btn btn'>Счет гостя</button>
                    <button type='button' className='btn-list__btn btn btn_secondary'>Оплатить<br /> онлайн</button>
                    <button type='button' className='btn-list__btn btn btn_secondary'>Картой<br /> при получении</button>
                    <button type='button' className='btn-list__btn btn btn_secondary'>Наличными</button>
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
            <div className='cart__row-label'>Контактные данные</div>

            <div className='cart__row-content'>
              <div className='form-group form-floating'>
                <input type='text' placeholder='&nbsp;' className='form-control' required />
                <label className='form-label'>Номер комнаты</label>
              </div>

              <div className='form-group form-floating'>
                <input type='text' placeholder='&nbsp;' className='form-control' required />
                <label className='form-label'>Фамилия латиницей</label>
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
                <label className='form-label'>Прочие пожелания</label>
              </div>
            </div>
          </div>

          <div className='cart__btn-row'>
            <button type='button' className='cart__btn btn btn_lg'>Подтвердить заказ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart