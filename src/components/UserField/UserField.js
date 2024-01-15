import './userField.css'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiUser } from 'react-icons/bi'
import { NavLink, Link } from 'react-router-dom'

import { setUser } from '../../features/user/userSlice'
import { useLang } from '../../hooks/useLang'
import { selectInit } from '../../features/init/initSlice'
import { selectUser } from '../../features/user/userSlice'
import { MdChevronRight } from 'react-icons/md'
import { FiLogIn, FiUsers } from 'react-icons/fi'
import API from '../../API/API'

const UserField = ({ closeMenu }) => {
  const { userData } = useSelector(selectUser)
  const { initData } = useSelector(selectInit)

  const dispatch = useDispatch()
  const getLang = useLang()
  const [dropdownOpen, setDropdownOpen] = useState(true)
 

  if (initData.user?.loyalty) {
    if (!userData?.userId) {
      return (
        <div className='menu__item'>
          <Link to='/profile' className='menu__btn' onClick={() => {
            localStorage.setItem('redirectUrl', window.location.hash.replace('#/', ''))
            closeMenu()
          }}>
            <span className='menu__btn-text'>
              <span className='menu__btn-title h2'>{getLang('ts_login_title')}</span>
              <span className='menu__btn-desc'>{getLang('ts_login_description')}</span>
            </span>
            <span className='menu__btn-arrow'>
              <MdChevronRight />
            </span>
          </Link>
        </div>
      )
    }

    return (
      <>
        <div className='user-field'>
        {userData?.bonusesActive ?
          <div className='user-field__bonuses'>{getLang('ts_points_available')} {userData.profile.bonuses}</div>
        : null}

          <div className='user-field__wrapper'>
            <div className='user-field__image'>
              {userData.photo ?
                <img src={userData.photo} /> :
                <BiUser />
              }
            </div>
            <div className='user-field__content'>
              <div className='user-field__name'>{userData.profile.name} {userData.profile.surname}</div>
              <div className='user-field__email'>{userData.profile.email}</div>
            </div>
          </div>
        </div>

        <div className={`menu__group ${dropdownOpen ? 'is-open' : ''}`}>
          <div className='menu__group-header'>
            <button
              className='menu__btn'
              type='button'
              onClick={() => {
                setDropdownOpen(dropdownOpen => !dropdownOpen)
              }}
            >
              <span className='menu__btn-icon'>
                <FiUsers />
              </span>

              <span className='menu__btn-text'>{getLang('ts_profile')}</span>

              <span className='menu__btn-arrow'>
                <MdChevronRight />
              </span>
            </button>
          </div>

          <div className='menu__group-list'>
            <div className='menu__item'>
              <NavLink to='/profile' className='menu__btn' end={true} onClick={closeMenu}>
                <span className='menu__btn-text'>{getLang('ts_profile_nav_data')}</span>
              </NavLink>
            </div>

            <div className='menu__item'>
              <NavLink to='/profile/loyalty' className='menu__btn' onClick={closeMenu}>
                <span className='menu__btn-text'>{getLang('ts_profile_nav_loyalty')}</span>
              </NavLink>
            </div>

            <div className='menu__item'>
              <NavLink to='/profile/history' className='menu__btn' onClick={closeMenu}>
                <span className='menu__btn-text'>{getLang('ts_profile_nav_history')}</span>
              </NavLink>
            </div>

            <div className='menu__item'>
              <button
                className='menu__btn'
                type='button'
                onClick={() => {
                  API.logout()
                  dispatch(setUser(null))
                  localStorage.removeItem('authToken')
                  window.location.reload()
                }}
              >
                <span className='menu__btn-icon'>
                  <FiLogIn />
                </span>

                <span className='menu__btn-text'>{getLang('ts_profile_nav_logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return null;
}

export default UserField