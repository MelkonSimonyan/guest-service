import React from 'react'
import { MdErrorOutline, MdOutlineCheckCircleOutline, MdOutlineShoppingBasket } from 'react-icons/md'
import { useLang } from '../../hooks/useLang'
import { Link } from 'react-router-dom'

const PageMessage = ({ 
  type, 
  title, 
  subtitle, 
  button,
  buttonText,
}) => {
  const getLang = useLang()

  return (
    <div className='page-message'>
      <div className='page-message__content'>
        {type === 'error' ?
          <div className='page-message__icon' style={{ color: 'var(--error-color)' }}>
            <MdErrorOutline />
          </div> :
        type === 'success' ?
          <div className='page-message__icon' style={{ color: 'var(--success-color)' }}>
            <MdOutlineCheckCircleOutline />
          </div> :
          <div className='page-message__icon'>
            <MdOutlineShoppingBasket />
          </div>
        }

        {title ?
          <div className='page-message__title'>
            <span dangerouslySetInnerHTML={{ __html: title }}></span>
          </div> :
        null}

        <div className='page-message__subtitle'>
          {subtitle ? <span dangerouslySetInnerHTML={{ __html: subtitle }}></span> : null}
        </div>

        {button === 'reload' ?
          <button type='button'
            className='page-message__btn btn btn_lg'
            onClick={() => {
              window.location.reload()
            }}
          >{buttonText ? buttonText : getLang('tryAgain')}</button> :
        button === 'back' ?
          <Link className='page-message__btn btn btn_lg' to='/'>{buttonText ? buttonText : getLang('ts_back')}</Link> :
        null}
      </div>
    </div>
  )
}

export default PageMessage