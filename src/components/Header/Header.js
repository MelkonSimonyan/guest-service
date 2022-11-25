import './Header.css'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { selectInit } from '../../features/init/initSlice'
import { selectPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { menuShow, menuHide, langShow, currencyShow, selectVisibility } from '../../features/visibility/visibilitySlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { pageTitle, parentLink } = useSelector(selectPageInfo)
  const { menuVisible, langVisible, currencyVisible } = useSelector(selectVisibility)

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__content'>
          <div className='header__left'>
            {parentLink
              ? <button
                className='back-btn'
                onClick={() => (
                  navigate(parentLink)
                )}
              >
                <MdOutlineKeyboardBackspace />
              </button>
              : <>
                <button
                  type='button'
                  className={`lang-btn ${langVisible ? 'is-active' : ''}`}
                  onClick={() => {
                    dispatch(langShow())
                  }}
                >
                  <img src={`/assets/images/lang/flag-${initData.lang}.svg`} alt={initData.lang} />
                </button>

                <button
                  type='button'
                  className={`currency-btn ${currencyVisible ? 'is-active' : ''}`}
                  onClick={() => {
                    dispatch(currencyShow())
                  }}
                >
                  <span>{initData.currency}</span>
                </button>
              </>
            }
          </div>

          <div className='header__center'>
            <div className='header__title'>
              {
                pageTitle
                  ? <div className='header__title-text'>{pageTitle}</div>
                  : <>
                    <div className='header__title-icon'>
                      <img src={initData.hotel.logo} alt={initData.hotel.name} />
                    </div>
                    <div className='header__title-text'>{initData.hotel.name}</div>
                  </>
              }
            </div>
          </div>

          <div className='header__right'>
            <button
              type='button'
              className={`burger-btn ${menuVisible ? 'is-active' : ''}`}
              onClick={() => {
                dispatch(!menuVisible ? menuShow() : menuHide())
              }}
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header