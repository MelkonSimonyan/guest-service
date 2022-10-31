import './Modal.css'

import React from 'react'
import { useRef } from 'react'
import { MdClear } from 'react-icons/md'
import { CSSTransition } from 'react-transition-group'
import { useScrollLock } from '../../hooks/useScrollLock'

const ModalLayout = ({ visible, close, children, footer, image }) => {
  const modalWindow = useRef(null)

  useScrollLock(visible)

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames='modal'
      unmountOnExit
    >
      <div
        className={`modal ${footer ? 'has-footer' : ''}`}
        onClick={(e) => {
          if (!modalWindow.current.contains(e.target)) {
            close()
          }
        }}
      >
        <div className='modal__bg'></div>
        <div className='modal__wrapper'>
          <div className='container'>
            <div
              className='modal__window'
              ref={modalWindow}
            >
              <div className='modal__inner'>
                <div className='modal__main has-scrollbar'>
                  {image
                    ? <div
                      className='modal__image'
                      style={{ backgroundImage: 'url(' + image + ')' }}
                    ></div>
                    : null
                  }
                  {children}
                </div>
                {footer
                  ? <div className='modal__footer'>
                    {footer}
                  </div>
                  : null
                }
              </div>
              <button
                type='button'
                className='modal__close'
                onClick={close}
              >
                <MdClear />
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default ModalLayout