import './CartEmpty.css'

import React from 'react'
import { MdOutlineShoppingBasket } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useLang } from '../../hooks/useLang'

const CartEmpty = () => {
  const getLang = useLang()

  return (
    <div className='cart-empty'>
      <div className='cart-empty__content'>
        <div className='cart-empty__icon'>
          <MdOutlineShoppingBasket />
        </div>

        <div className='cart-empty__title'>{getLang('emptyBasket')}</div>

        <div className='cart-empty__subtitle'>{getLang('forOrderAddItems')}</div>

        <Link className='cart-empty__btn btn btn_lg' to='/'>{getLang('mainMenu')}</Link>
      </div>
    </div>
  )
}

export default CartEmpty