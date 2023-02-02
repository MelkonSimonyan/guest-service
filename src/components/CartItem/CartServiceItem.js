import './CartItem.css'

import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { selectInit } from '../../features/init/initSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const CartServiceItem = ({ item }) => {
  const navigate = useNavigate()
  const { initData } = useSelector(selectInit)

  return (
    <div className='cart-item'>
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
                navigate(window.history.state?.key ? -1 : '/')
              }}
            ><MdClose /></button>

            <div className='cart-item__title'>{item.title}</div>
          </div>

          <div className='cart-item__count-row'>
            <div className='cart-item__count-cell'>
              <div className='cart-item__subtitle'>{item.subTitle}</div>
            </div>

            <div className='cart-item__price-cell'>
              {item.service?.price ?
                <div className='cart-item__price'>{item.service.price}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div> : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartServiceItem