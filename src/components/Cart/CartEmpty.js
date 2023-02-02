import React from 'react'
import { MdOutlineShoppingBasket } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useLang } from '../../hooks/useLang'

const CartEmpty = () => {
  const getLang = useLang()

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

export default CartEmpty