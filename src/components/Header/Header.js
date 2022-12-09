import './Header.css'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

import { selectInit } from '../../features/init/initSlice'
import { selectPageInfo } from '../../features/pageInfo/pageInfoSlice'
import {
  langShow,
  currencyShow,
  menuShow,
} from '../../features/visibility/visibilitySlice'

import Languages from '../Languages/Languages'
import Currency from '../Currency/Currency'
import Menu from '../Menu/Menu'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { pageTitle, parentLink } = useSelector(selectPageInfo)

  const handleBack = () => {
    navigate(parentLink)
  }

  const handleLangShow = () => {
    dispatch(langShow())
  }

  const handleCurrencyShow = () => {
    dispatch(currencyShow())
  }

  const handleMenuShow = () => {
    dispatch(menuShow())
  }

  return (
    <>
      <header className='header'>
        <div className='container'>
          <div className='header__content'>
            <div className='header__center'>
              <div className='header__title'>
                {!pageTitle && initData.hotel.logo ?
                  <div className='header__title-icon'>
                    <img src={initData.hotel.logo} alt={initData.hotel.name} />
                  </div> :
                  <div className='header__title-text'>{pageTitle || initData.hotel.name}</div>
                }
              </div>
            </div>

            <div className='header__left'>
              {parentLink ?
                <button type='button'
                  className='header__btn _back'
                  onClick={handleBack}
                >
                  <MdOutlineKeyboardBackspace />
                </button> :
                <>
                  {Object.keys(initData.langs).length > 1 ?
                    <button type='button'
                      className='header__btn _lang'
                      onClick={handleLangShow}
                    >
                      <span
                        style={{
                          backgroundImage: `url(${process.env.REACT_APP_WIDGET_URL}/assets/images/lang/flag-${initData.lang}.svg)`
                        }}
                      ></span>
                    </button> : null}

                  {Object.keys(initData.currencies).length > 1 ?
                    <button type='button'
                      className='header__btn _currency'
                      onClick={handleCurrencyShow}
                    >
                      <span>{initData.currency}</span>
                    </button> : null}
                </>
              }
            </div>

            <div className='header__right'>
              <button
                type='button'
                className='header__btn _burger'
                onClick={handleMenuShow}
              >
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className='header-placeholder'></div>

      <Languages />

      <Currency />

      <Menu />
    </>
  )
}

export default Header