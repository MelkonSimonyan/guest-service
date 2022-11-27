import './CatalogItem.css'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectInit } from '../../features/init/initSlice'
import { selectCart } from '../../features/cart/cartSlice'

const CatalogItem = ({ item }) => {
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
    searchParams.set('modalType', 'item')
    searchParams.set('modalId', item.id)
    setSearchParams(searchParams)
  }

  return (
    <div
      className='catalog-item'
      onClick={clickHandler}
    >
      <div className='catalog-item__content'>
        {item.title ?
          <div className='catalog-item__title'>{item.title}</div> : null
        }

        {item.price ?
          <div className='catalog-item__price'>{item.price}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div> : null
        }
      </div>

      {item.pic ?
        <div className='catalog-item__image'>
          <img src={item.pic} />

          {quantity ?
            <span className='catalog-item__basket-count'>{quantity}</span> : null
          }
        </div> : null
      }
    </div>
  )
}

export default CatalogItem