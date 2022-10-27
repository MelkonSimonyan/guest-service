import './OrderItem.css'

import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectInit } from '../../features/init/initSlice'

const OrderItem = ({ item }) => {
  const { initData } = useSelector(selectInit)

  return (
    <Link
      className='order-item'
      to={'?modalType=order&modalId=' + item.id}
    >
      <div className='order-item__content'>
        {item.title
          ? <div className='order-item__title'>{item.title}</div>
          : null
        }
        {item.price
          ? <div className='order-item__price'>{item.price} {initData.hotel.currency}</div>
          : null
        }
      </div>

      {item.pic
        ? <div className='order-item__image'>
          <img src={item.pic} />
        </div>
        : null
      }
    </Link>
  )
}

export default OrderItem