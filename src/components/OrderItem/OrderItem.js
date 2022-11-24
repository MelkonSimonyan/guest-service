import './OrderItem.css'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectInit } from '../../features/init/initSlice'
import { selectCart } from '../../features/cart/cartSlice'

const OrderItem = ({ item }) => {
  const { cartProducts } = useSelector(selectCart)
  const { initData } = useSelector(selectInit)
  const [searchParams, setSearchParams] = useSearchParams()
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const exist = cartProducts.find(x => x.id === item.id)
    if (exist) {
      setQuantity(exist.quantity)
    } else {
      setQuantity(0)
    }
  }, [cartProducts])

  const clickHandler = () => {
    searchParams.set('modalType', 'store')
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
          ? <div className='order-item__price'>{item.price} <span dangerouslySetInnerHTML={{ __html: initData.currency }} /></div>
          : null
        }
      </div>

      {item.pic
        ? <div className='order-item__image'>
          <img src={item.pic} />
          {quantity ? <span className='order-item__basket-count'>{quantity}</span> : null}
        </div>
        : null
      }
    </div>
  )
}

export default OrderItem