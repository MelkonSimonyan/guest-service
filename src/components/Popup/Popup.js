import './Popup.css'

import {
  useRef,
  useEffect,
} from 'react'
import { MdClear } from 'react-icons/md'
import { CSSTransition } from 'react-transition-group'

const Popup = ({ visible, close, children }) => {
  const popupContent = useRef(null)

  useEffect(() => {
    if (visible) {
      document.documentElement.style.setProperty('--scrollbarWidth', window.innerWidth - document.documentElement.clientWidth + 'px')
      document.documentElement.classList.add('is-popup-open')
    } else {
      document.documentElement.classList.remove('is-popup-open')
    }

    return () => {
      document.documentElement.classList.remove('is-popup-open')
    }
  }, [visible])

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames='popup-transition'
      unmountOnExit
    >
      <div
        className='popup'
        onClick={(e) => {
          if (!popupContent.current.contains(e.target)) {
            close()
          }
        }}
      >
        <div className='popup__bg'></div>
        <div className='popup__wrapper'>
          <div className='container'>
            <div
              className='popup__window'
              ref={popupContent}
            >
              <div className='popup__inner'>
                {children}
              </div>
              <button
                type='button'
                className='popup__close'
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

export default Popup