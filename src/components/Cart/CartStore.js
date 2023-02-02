import './Cart.css'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { selectCart, clearCart } from '../../features/cart/cartSlice'

import { useLang } from '../../hooks/useLang'
import { getItem } from '../../utils/getItem'

import ModalLayout from '../Modal/ModalLayout'
import CartItem from '../CartItem/CartItem'
import CartForm from '../CartForm/CartForm'
import Recommend from '../Recommend/Recommend'
import CartTotal from './CartTotal'
import CartError from './CartError'
import CartEmpty from './CartEmpty'
import { isClose } from '../../utils/isClose'
import { FiAlertTriangle } from 'react-icons/fi'

const CartStore = ({ store }) => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const { carts } = useSelector(selectCart)
  const navigate = useNavigate()

  const [time, setTime] = useState(store.noTime ? '' : (new Date()).getTime())
  const [cart, setCart] = useState([])
  const [hasRemovedItems, setHasRemovedItems] = useState(false)
  const [total, setTotal] = useState(null)
  const [asap, setAsap] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [close, setClose] = useState(false)

  useEffect(() => {
    if (store.storeWorkTime && isClose(store.storeWorkTime.from, store.storeWorkTime.to, time)) {
      setAsap(false)
      setClose(store.noWorkMessage || getLang('noWorkMessage'))
    } else {
      setClose(false)
    }
  }, [time])

  useEffect(() => {
    if (carts.length) {
      let cart = []

      carts.find(x => x.storeId == store.storeId)?.products.forEach(item => {
        const product = getItem(initData.pages, item.id, item.storeId)

        if (product) {
          cart.push({
            ...product,
            quantity: item.quantity
          })
        }
      })

      setCart(cart)
    }
  }, [carts])

  useEffect(() => {
    if (success) {
      dispatch(clearCart({
        storeId: store.storeId
      }))

      localStorage.setItem('orderRedirect', 'true')
      navigate('/order/' + success.orderId)
    }
  }, [success])

  if (error) {
    return (
      <CartError error={error} />
    )
  }

  if (!cart.length) {
    return (
      <CartEmpty />
    )
  }

  return (
    <>
      <div className='cart'>
        {close ?
          <div className='close-message'>
            <FiAlertTriangle />
            <div>{close}</div>
          </div> : null
        }

        <div className='cart__list'>
          {cart.map(item => (
            <CartItem
              item={item}
              time={time}
              store={store}
              key={item.id}
            />
          ))}
        </div>

        <Recommend
          storeId={store.storeId}
          cart={cart}
        />

        <CartTotal
          {...{
            cart,
            store,
            total,
            setTotal,
          }}
        />

        <CartForm
          cart={cart}
          store={store}
          time={time}
          asap={asap}
          close={close}
          setTime={setTime}
          noTime={store.noTime}
          cartType={'store'}
          waitTime={store.waitTime}
          setError={setError}
          noPersons={store.noPersons}
          hidePrice={total?.amount ? false : true}
          setSuccess={setSuccess}
          storeWorkTime={store.storeWorkTime}
          maxDaysDelivery={store.maxDaysDelivery}
          setHasRemovedItems={setHasRemovedItems}
        />
      </div>

      <ModalLayout
        visible={hasRemovedItems}
        close={() => {
          setHasRemovedItems(false)
        }}
        footer={<button
          type='button'
          className='btn btn_lg'
          onClick={() => {
            setHasRemovedItems(false)
          }}
        >{getLang('close')}</button>}
      >
        <div className='modal__header'>
          <h2 className='modal__title'>{getLang('attention')}</h2>
        </div>

        <div className='modal__desc'>{getLang('hasClosedItems')}<br /><br /></div>
      </ModalLayout>
    </>
  )
}

export default CartStore