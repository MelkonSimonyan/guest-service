import './CatalogItem.css'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { selectInit } from '../../features/init/initSlice'
import { selectCart, setToCart } from '../../features/cart/cartSlice'
import { MdOutlineShoppingBasket } from 'react-icons/md'

const CatalogItem = ({
  item,
  storeId,
  type,
}) => {
  const dispatch = useDispatch()
  const { carts } = useSelector(selectCart)
  const { initData } = useSelector(selectInit)
  const [searchParams, setSearchParams] = useSearchParams()
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const exist = carts.find(x => x.storeId == storeId).products.find(x => x.id === item.id)

    if (exist) {
      setQuantity(exist.quantity)
    } else {
      setQuantity(0)
    }
  }, [carts])

  const openModal = () => {
    searchParams.set('modalType', 'item')
    searchParams.set('modalId', item.id)
    searchParams.set('storeId', storeId)
    setSearchParams(searchParams)
  }

  const setToCard = () => {
    dispatch(setToCart({
      ...item,
      storeId,
    }))
  }

  return (
    <div
      className={`catalog-item ${type === 'small' ? '_small' : ''} ${quantity ? 'is-active' : ''}`}
      onClick={type !== 'small' ? openModal : setToCard}
    >
      {item.pic ?
        <div className='catalog-item__image'>
          <LazyLoadImage
            src={item.picSmall || item.pic}
            alt={item.title}
            effect='opacity'
          />

          {quantity ?
            <span className='catalog-item__basket-count'>{quantity}</span> : null
          }
        </div> : null
      }

      <div className='catalog-item__content'>
        {item.title ?
          <div className='catalog-item__title'>{item.title}</div> : null
        }

        <div className='catalog-item__price-row'>
          {item.price ?
            <div className='catalog-item__price'>{item.price}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div> : null
          }

          {type !== 'small' ?
            <button type='button'
              className='catalog-item__btn btn'
              onClick={(e) => {
                e.stopPropagation()
                setToCard()
              }}
            >
              <MdOutlineShoppingBasket />
            </button> : null
          }
        </div>
      </div>
    </div>
  )
}

export default CatalogItem