import './Header.css'

import React from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { selectInit } from '../../features/init/initSlice'
import { selectCurrentPage } from '../../features/currentPage/currentPageSlice'
import {
  menuShow,
  menuHide,
  langShow,
  selectVisibility
} from '../../features/visibility/visibilitySlice'
import { useLang } from '../../hooks/useLang'

const Header = () => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { currentPageData } = useSelector(selectCurrentPage)
  const {
    menuVisible,
    langVisible
  } = useSelector(selectVisibility)
  const getLang = useLang()

  return (
    <>
      <header className='header'>
        <div className='container'>
          <div className='header__content'>
            <div className='header__left'>
              {currentPageData && currentPageData.parentId
                ? <Link
                  className='back-btn'
                  to={
                    currentPageData.parentId === '/'
                      ? '/'
                      : '/page/' + currentPageData.parentId
                  }
                >
                  <MdOutlineKeyboardBackspace />
                </Link>
                : <button
                  type='button'
                  className={`lang-btn ${langVisible ? 'is-active' : ''}`}
                  onClick={() => {
                    dispatch(langShow())
                  }}
                >
                  <img src={`/assets/images/lang/flag-${initData.lang}.svg`} alt={initData.lang} />
                </button>
              }
            </div>

            <div className='header__center'>
              <div className='header__title'>
                {
                  currentPageData && currentPageData.title
                    ? <div className='header__title-text'>{currentPageData.title}</div>
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
      <div className='header-placeholder'></div>
    </>
  )
}

export default Header