import React from 'react'
import { MdErrorOutline } from 'react-icons/md'

import { useLang } from '../../hooks/useLang'

const CartError = ({ error, setError }) => {
  const getLang = useLang()

  return (
    <div className='page-message'>
      <div className='page-message__content'>
        <div className='page-message__icon' style={{ color: 'var(--error-color)' }}>
          <MdErrorOutline />
        </div>

        <div className='page-message__subtitle'>{<span dangerouslySetInnerHTML={{ __html: error }}></span>}</div>

        <button type='button' className='page-message__btn btn btn_lg' onClick={() => { setError(null) }}>{getLang('tryAgain')}</button>
      </div>
    </div>
  )
}

export default CartError