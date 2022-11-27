import './CartItem.css'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdClose } from 'react-icons/md'
import { selectInit } from '../../features/init/initSlice'

const CartServiceItem = ({ item, remove }) => {
  const { initData } = useSelector(selectInit)

  return (
    <div className='cart-item'>
      <div className='cart-item__image'>
        <img src={item.pic} alt={item.title} />
      </div>

      <div className='cart-item__content'>
        <div className='cart-item__header'>
          <button
            type='button'
            className='cart-item__remove'
            onClick={remove}
          ><MdClose /></button>

          <div className='cart-item__title'>{item.title}</div>
        </div>

        <div className='cart-item__count-row'>
          <div className='cart-item__count-cell'>
            <div className='cart-item__subtitle'>{item.subTitle}</div>
          </div>

          <div className='cart-item__price-cell'>
            <div className='cart-item__price'>{item.service.price}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartServiceItem