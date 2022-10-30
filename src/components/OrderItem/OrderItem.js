import './OrderItem.css'

import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectInit } from '../../features/init/initSlice'

const OrderItem = ({ item }) => {
  const { initData } = useSelector(selectInit)
  const [searchParams, setSearchParams] = useSearchParams()

  const clickHandler = () => {
    searchParams.set('modalType', 'order')
    searchParams.set('modalId', item.id)
    setSearchParams(searchParams)
  }

  return (
    <div
      className='order-item'
      onClick={clickHandler}
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
    </div>
  )
}

export default OrderItem