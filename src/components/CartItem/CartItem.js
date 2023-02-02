import './CartItem.css'

import React, { useEffect, useState } from 'react'
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
import { isClose } from '../../utils/isClose'
import { useLang } from '../../hooks/useLang'
import { FiAlertTriangle } from 'react-icons/fi'

const CartItem = ({
  store,
  item,
  time,
}) => {
  const getLang = useLang()
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const [close, setClose] = useState(false)

  useEffect(() => {
    let category = store.categories?.find(cat => cat.id === item.categoryId)

    if (category?.category_id > 0) {
      category = store.categories.find(cat => cat.id === category.category_id)
    }

    if (category?.storeWorkTime && isClose(category?.storeWorkTime.from, category?.storeWorkTime.to, time)) {
      setClose(category.noWorkMessage || getLang('noWorkMessage'))
    } else {
      setClose(false)
    }
  }, [time])

  return (
    <>
      <div className={`cart-item ${close ? 'is-closed' : ''}`}>
        <div className='cart-item__wrapper'>
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
        {close ?
          <div className='cart-item__close-message'>
            <FiAlertTriangle />
            <span>{close}</span>
          </div> : null
        }
      </div>
    </>
  )
}

export default CartItem