import React from 'react'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useLang } from '../../hooks/useLang'

const CartSuccess = ({ success }) => {
  const getLang = useLang()

  return (
    <div className='page-message'>
      <div className='page-message__content'>
        <div className='page-message__icon' style={{ color: 'var(--success-color)' }}>
          <MdOutlineCheckCircleOutline />
        </div>

        <div className='page-message__subtitle'>{success.length ? success : <span dangerouslySetInnerHTML={{ __html: getLang('orderSuccess') }}></span>}</div>

        <Link className='page-message__btn btn btn_lg' to='/'>{getLang('mainMenu')}</Link>
      </div>
    </div>
  )
}

export default CartSuccess