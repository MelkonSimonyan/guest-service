import './Menu.css'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { MdChevronRight, MdLanguage, MdCheck, MdOutlineShoppingBasket } from 'react-icons/md'
import { FaRegMoneyBillAlt } from 'react-icons/fa'

import { selectInit } from '../../features/init/initSlice'
import {
  selectVisibility,
  menuHide,
  langShow,
  currencyShow,
} from '../../features/visibility/visibilitySlice'


import { useLang } from '../../hooks/useLang'
import { useScrollLock } from '../../hooks/useScrollLock'

import UserField from '../UserField/UserField'

const Menu = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData } = useSelector(selectInit)
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
            <div className='menu__main'>
              {/* <h2 className='menu__title'>{getLang('mainMenu')}</h2> */}
              
              <div className='menu__list'>
                <UserField closeMenu={closeMenu} />

                {Object.keys(initData.menu).map(key => (
                  <div className='menu__item' key={key}>
                    <Link to={key} className='menu__btn'>
                      <span className='menu__btn-icon'>
                        <MdCheck />
                      </span>

                      <span className='menu__btn-text'>
                        {initData.menu[key]}
                      </span>

                      <span className='menu__btn-arrow'>
                        <MdChevronRight />
                      </span>
                    </Link>
                  </div>
                ))}

                {Object.keys(initData.langs).length > 1 ?
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
                  </div> : null}

                {Object.keys(initData.currencies).length > 1 ?
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
                  </div> : null}
              </div>

              <dl className='menu__data'>
                {initData.hotel?.phone ? <div>
                  <dt>{getLang('phone')}: </dt>
                  <dd><a href={`tel:${initData.hotel.phone}`}>{initData.hotel.phone}</a></dd>
                </div> : null}
                {initData.hotel?.email ? <div>
                  <dt>{getLang('email')}: </dt>
                  <dd><a href={`mailto:${initData.hotel.email}`}>{initData.hotel.email}</a></dd>
                </div> : null}
                {initData.hotel?.address ? <div>
                  <dt>{getLang('address')}: </dt>
                  <dd>{initData.hotel.address}</dd>
                </div> : null}
              </dl>
            </div>

            <div className='menu__copyright' dangerouslySetInnerHTML={{ __html: getLang('copyrights') }} />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Menu