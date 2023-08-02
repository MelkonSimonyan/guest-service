import React from 'react'
import { MdOutlineShoppingBasket } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useLang } from '../../hooks/useLang'
import PageMessage from '../../components/PageMessage/PageMessage'

const CartEmpty = () => {
  const getLang = useLang()

  return (
    <div className='cart'>
      <PageMessage
        title={getLang('emptyBasket')}
        subtitle={getLang('forOrderAddItems')}
        button='back'
      />
    </div>
  )
}

export default CartEmpty