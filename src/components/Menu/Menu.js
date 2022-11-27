import './Menu.css'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { MdChevronRight, MdLanguage, MdOutlineShoppingBasket } from 'react-icons/md'
import { FaRegMoneyBillAlt } from 'react-icons/fa'

import {
  selectVisibility,
  menuHide,
  langShow,
  currencyShow,
} from '../../features/visibility/visibilitySlice'

import { useLang } from '../../hooks/useLang'
import { useScrollLock } from '../../hooks/useScrollLock'

const Menu = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { menuVisible } = useSelector(selectVisibility)
  const getLang = useLang()

  useScrollLock(menuVisible)

  const closeMenu = () => {
    dispatch(menuHide())
  }

  const openLang = () => {
    closeMenu()
    dispatch(langShow())
  }

  const openCurrency = () => {
    closeMenu()
    dispatch(currencyShow())
  }

  useEffect(() => {
    if (menuVisible) {
      closeMenu()
    }
  }, [location.pathname])

  return (
    <CSSTransition
      in={menuVisible}
      timeout={300}
      classNames='menu'
      unmountOnExit
    >
      <div className='menu'>
        <div
          className='menu__bg'
          onClick={closeMenu}
        ></div>

        <div className='menu__inner'>
          <div className='menu__content has-scrollbar'>
            <h2 className='menu__title'>{getLang('mainMenu')}</h2>

            <div className='menu__list'>
              <div className='menu__item'>
                <Link to='/cart/' className='menu__btn'>
                  <span className='menu__btn-icon'>
                    <MdOutlineShoppingBasket />
                  </span>

                  <span className='menu__btn-text'>
                    {getLang('myOrder')}
                  </span>

                  <span className='menu__btn-arrow'>
                    <MdChevronRight />
                  </span>
                </Link>
              </div>

              <div className='menu__item'>
                <button
                  className='menu__btn'
                  type='button'
                  onClick={openLang}
                >
                  <span className='menu__btn-icon'>
                    <MdLanguage />
                  </span>

                  <span className='menu__btn-text'>
                    {getLang('languages')}
                  </span>

                  <span className='menu__btn-arrow'>
                    <MdChevronRight />
                  </span>
                </button>
              </div>

              <div className='menu__item'>
                <button
                  className='menu__btn'
                  type='button'
                  onClick={openCurrency}
                >
                  <span className='menu__btn-icon'>
                    <FaRegMoneyBillAlt />
                  </span>

                  <span className='menu__btn-text'>
                    {getLang('currency')}
                  </span>

                  <span className='menu__btn-arrow'>
                    <MdChevronRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Menu