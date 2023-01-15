import './CartItem.css'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdClose } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { selectInit } from '../../features/init/initSlice'
import {
  increaseCart,
  decreaseCart,
  removeFromCart,
} from '../../features/cart/cartSlice'

import NumberControl from '../NumberControl/NumberControl'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)

  return (
    <div className='cart-item'>
      <div className='cart-item__image'>
        <LazyLoadImage
          src={item.picSmall || item.pic}
          alt={item.title}
          effect='opacity'
        />
      </div>

      <div className='cart-item__content'>
        <div className='cart-item__header'>
          <button
            type='button'
            className='cart-item__remove'
            onClick={() => {
              dispatch(removeFromCart({
                id: item.id,
                storeId: item.storeId
              }))
            }}
          ><MdClose /></button>

          <div className='cart-item__title'>{item.title}</div>
        </div>

        <div className='cart-item__count-row'>
          <div className='cart-item__count-cell'>
            <NumberControl
              value={item.quantity}
              decrease={() => {
                dispatch(decreaseCart({
                  id: item.id,
                  storeId: item.storeId
                }))
              }}
              increase={() => {
                dispatch(increaseCart({
                  id: item.id,
                  storeId: item.storeId
                }))
              }}
            />
          </div>

          <div className='cart-item__price-cell'>
            <div className='cart-item__price'>{item.quantity * item.price}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem