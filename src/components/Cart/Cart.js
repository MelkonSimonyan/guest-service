import './Cart.css'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MdErrorOutline, MdOutlineShoppingBasket, MdOutlineCheckCircleOutline } from 'react-icons/md'

import { selectInit } from '../../features/init/initSlice'
import { selectCart, clearCart } from '../../features/cart/cartSlice'

import { useLang } from '../../hooks/useLang'
import { getItem } from '../../utils/getItem'

import CartItem from '../CartItem/CartItem'
import CartServiceItem from '../CartItem/CartServiceItem'
import CartForm from '../CartForm/CartForm'

const Cart = ({
  cartType,
  store,
  service,
}) => {
  const getLang = useLang()
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { carts } = useSelector(selectCart)
  const navigate = useNavigate()

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
      }

      localStorage.setItem('orderRedirect', 'true')
      navigate('/order/' + success.orderId)
    }
  }, [success])

  if (error) {
    return (
      <div className='cart'>
        <div className='page-message'>
          <div className='page-message__content'>
            <div className='page-message__icon' style={{ color: 'var(--error-color)' }}>
              <MdErrorOutline />
            </div>

            <div className='page-message__subtitle'>
              <span dangerouslySetInnerHTML={{ __html: error }}></span>
            </div>

            <button type='button'
              className='page-message__btn btn btn_lg'
              onClick={() => {
                window.location.reload()
              }}
            >{getLang('tryAgain')}</button>
          </div>
        </div>
      </div>
    )
  }

  if (!cartProducts?.length && !cartService) {
    return (
      <div className='cart'>
        <div className='page-message'>
          <div className='page-message__content'>
            <div className='page-message__icon'>
              <MdOutlineShoppingBasket />
            </div>

            <div className='page-message__title'>{getLang('emptyBasket')}</div>

            <div className='page-message__subtitle'>{getLang('forOrderAddItems')}</div>

            <Link className='page-message__btn btn btn_lg' to='/'>{getLang('mainMenu')}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='cart'>
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
        waitTime={store?.waitTime || service?.waitTime}
        maxDaysDelivery={store?.maxDaysDelivery || service?.maxDaysDelivery}
      />
    </div>
  )
}

export default Cart