import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectUser } from '../../features/user/userSlice'
import { useLang } from '../../hooks/useLang'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

const ProfileLoyaltyPage = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(selectUser)
  const getLang = useLang()
  const [rotate, setRotate] = useState(false)

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'profile',
      pageTitle: getLang('ts_profile_nav_loyalty'),
      parentLink: -1
    }))
  }, [])

  return (
    <div className='loyalty-block' onClick={() => {
      setRotate(rotate => !rotate)
    }}>
      <div className={`loyalty-card ${rotate ? 'is-rotate' : ''}`}>
        <div className='loyalty-card__front'>
          <div className='loyalty-card__header'>
            <div className='loyalty-card__title'>{getLang('ts_loyalty_programm')}</div>
            <div className='loyalty-card__icon'>
              <svg viewBox="0 0 20 24" fill="none" stroke="currentColor"><path d="M15.143 1.285a21.429 21.429 0 0 1 0 21.429M10.429 3.642a16.714 16.714 0 0 1 0 16.715m-4.5-14.55a12.314 12.314 0 0 1 1.619 6.107c0 2.144-.559 4.25-1.62 6.107m-4.5-9.879A6.99 6.99 0 0 1 2.599 12a6.99 6.99 0 0 1-1.17 3.858" strokeWidth="2.571" strokeLinecap="round"/></svg>
            </div>
          </div>

          <div className='loyalty-card__content'>
            {userData.status?.current ? 
            <div className='loyalty-card__status-wrapper'>
              <div className='loyalty-card__status-title'>{getLang('ts_loyalty_status')}</div>
              <div className='loyalty-card__status'>{userData.status.current}</div>
            </div> : ''}
          </div>

          <div className='loyalty-card__footer'>
            <div className='loyalty-card__footer-left'>
              <div className='loyalty-card__info'>
                {userData.status.conditions.map(item => 
                  <div className='loyalty-card__info-row' key={item}>{item}</div>
                )}
              </div>
            </div>

            <div className='loyalty-card__footer-right'>
              {userData.status?.stat?.length ?
              <div className='loyalty-card__data-wrapper'>
                <div className='loyalty-card__data-title'>{getLang('ts_loyalty_balance')}</div>
                <div className='loyalty-card__data'>
                  {userData.status.stat.map(item => 
                    <div className='loyalty-card__data-row' key={item} dangerouslySetInnerHTML={{__html: item}} />
                  )}
                </div>
              </div> : ''}
            </div>
          </div>
        </div>

        <div className='loyalty-card__back'>
          <div className='loyalty-card__back-content'>
            {userData.status?.next ? <div className='loyalty-card__next' dangerouslySetInnerHTML={{__html: userData.status.next}} /> : ''}
          </div>
          <div className='loyalty-card__back-footer'>
            {userData.status?.rules?.link && userData.status?.rules?.text ?
              <div className='loyalty-card__rule'>
                <a target='_blank' href={userData.status.rules.link}>{userData.status.rules.text}</a>
              </div>
            : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLoyaltyPage