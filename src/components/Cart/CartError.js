import React from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { useLang } from '../../hooks/useLang'
import PageMessage from '../../components/PageMessage/PageMessage'

const CartError = ({ error }) => {
  const getLang = useLang()

  return (
    <div className='cart'>
      <PageMessage
        type='error'
        subtitle={error}
        button='reload'
      />
    </div>
  )
}

export default CartError