import './CartStore.css'

import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { selectCart } from '../../features/cart/cartSlice'

import { useLang } from '../../hooks/useLang'
import { getItem } from '../../utils/getItem'

import CartItem from '../CartItem/CartItem'
import CartForm from '../CartForm/CartForm'
import CartEmpty from '../CartEmpty/CartEmpty'

const CartStore = () => {
  const getLang = useLang()
  const params = useParams()
  const { initData } = useSelector(selectInit)
  const { carts } = useSelector(selectCart)
  const [amount, setAmount] = useState(0)
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    let cartProducts = []

    carts.find(x => x.storeId == params.id).products.forEach(productData => {
      const product = getItem(initData.pages, productData.id, productData.storeId)

      cartProducts.push({
        ...product,
        quantity: productData.quantity
      })
    })

    setCartProducts(cartProducts)
  }, [carts])

  useEffect(() => {
    let amount = 0

    cartProducts.forEach(cartProduct => {
      amount += cartProduct.quantity * cartProduct.price
    })

    setAmount(amount)
  }, [cartProducts])

  const serviceFee = useMemo(() => {
    return amount * 10 / 100
  }, [amount])

  if (!cartProducts.length) {
    return (
      <div className='cart'>
        <CartEmpty />
      </div>
    )
  }

  return (
    <div className='cart'>
      <div className='cart__list'>
        {cartProducts.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

      <div className='cart__data'>
        <div className='cart__data-row'>
          <div className='cart__data-title'>{getLang('orderPrice')}</div>
          <div className='cart__data-value'>{amount}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
        </div>

        <div className='cart__data-row'>
          <div className='cart__data-title'>{getLang('serviceFee')}</div>
          <div className='cart__data-value'>{serviceFee}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
        </div>

        <div className='cart__data-row _total'>
          <div className='cart__data-title'>{getLang('amount')}</div>
          <div className='cart__data-value'>{amount + serviceFee}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div>
        </div>
      </div>

      <CartForm />
    </div>
  )
}

export default CartStore