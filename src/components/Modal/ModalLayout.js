import './Modal.css'

import {
  useRef,
  useEffect,
} from 'react'
import { MdClear } from 'react-icons/md'
import { CSSTransition } from 'react-transition-group'

const ModalLayout = ({ visible, close, children, footer, image }) => {
  const modalWindow = useRef(null)

  useEffect(() => {
    if (visible) {
      document.documentElement.style.setProperty('--scrollbarWidth', window.innerWidth - document.documentElement.clientWidth + 'px')
      document.documentElement.classList.add('is-modal-open')
    } else {
      document.documentElement.classList.remove('is-modal-open')
    }

    return () => {
      document.documentElement.classList.remove('is-modal-open')
    }
  }, [visible])

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