import './Cart.css'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectInit } from '../../features/init/initSlice'
import { selectCart, clearCart } from '../../features/cart/cartSlice'

import { useLang } from '../../hooks/useLang'
import { getItem } from '../../utils/getItem'

import CartItem from '../CartItem/CartItem'
import CartServiceItem from '../CartItem/CartServiceItem'
import CartForm from '../CartForm/CartForm'
import CartEmpty from '../CartEmpty/CartEmpty'
import CartError from '../CartError/CartError'
import CartSuccess from '../CartSuccess/CartSuccess'

const Cart = ({
  cartType,
  store,
  service,
}) => {
  const getLang = useLang()
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { carts } = useSelector(selectCart)

  const [cartProducts, setCartProducts] = useState(null)
  const [cartService, setCartService] = useState(null)
  const [total, setTotal] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cartType === 'service' && service) {
      setCartService(service)
    }
  }, [])

  useEffect(() => {
    if (cartType === 'store' && carts.length) {
      let cartProducts = []

      carts.find(x => x.storeId == store.storeId)?.products.forEach(item => {
        const product = getItem(initData.pages, item.id, item.storeId)

        cartProducts.push({
          ...product,
          quantity: item.quantity
        })
      })

      setCartProducts(cartProducts)
    }
  }, [carts])

  useEffect(() => {
    let amount = 0
    let fee

    if (store) {
      cartProducts?.forEach(cartProduct => {
        amount += cartProduct.quantity * cartProduct.price
      })
      fee = store.serviceFee
    } else if (cartService) {
      amount = cartService.service.price
      fee = cartService.serviceFee
    }

    setTotal({
      amount,
      fee:
        !fee ? null :
          fee.type === 'percent' ?
            fee.value + '%' :
            fee.value + initData.currencies[initData.currency].symbol,
      amountWithFee:
        !fee ? amount :
          fee.type === 'percent' ?
            amount + amount * fee.value / 100 :
            amount + fee.value
    })
  }, [cartProducts, cartService])

  useEffect(() => {
    if (success) {
      if (store) {
        dispatch(clearCart({
          storeId: store.storeId
        }))
      } else if (cartService) {
        setCartService(null)
      }
    }
  }, [success])

  if (success) {
    return (
      <div className='cart'>
        <CartSuccess success={success} />
      </div>
    )
  }

  if (!cartProducts?.length && !cartService) {
    return (
      <div className='cart'>
        <CartEmpty />
      </div>
    )
  }

  return (
    <div className='cart'>
      {error ? (
        <CartError error={error} setError={setError} />
      ) : null}

      <div className={`cart__content ${error ? 'is-hidden' : ''}`}>
        <div className='cart__list'>
          {cartProducts ? cartProducts.map(item => (
            <CartItem item={item} key={item.id} />
          )) : cartService ?
            <CartServiceItem item={cartService} /> : null
          }
        </div>

        <div className='cart__data'>
          {total?.fee ?
            <>
              <div className='cart__data-row'>
                <div className='cart__data-title'>{getLang('orderPrice')}</div>
                <div className='cart__data-value'>{total?.amount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
              </div>

              <div className='cart__data-row'>
                <div className='cart__data-title'>{getLang('serviceFee')}</div>
                <div className='cart__data-value'>{total?.fee}</div>
              </div>
            </> : null
          }

          <div className='cart__data-row _total'>
            <div className='cart__data-title'>{getLang('amount')}</div>
            <div className='cart__data-value'>{total?.amountWithFee}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
          </div>
        </div>

        <CartForm
          type={cartType}
          storeId={cartType === 'store' ? store.storeId : ''}
          cart={cartProducts ? cartProducts : cartService ? [cartService] : null}
          setError={setError}
          setSuccess={setSuccess}
        />
      </div>
    </div>
  )
}

export default Cart