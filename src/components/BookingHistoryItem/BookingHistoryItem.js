import React, { useRef } from 'react'

import { useLang } from '../../hooks/useLang'

const BookingHistoryItem = ({ item }) => {
  const getLang = useLang()
  const payFormWrapper = useRef(null)

  return (
    <>
      <div className='profile-history__item-icon'>
        {
          item.status.code === 'c' ? 
            <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m19.42 19.42-8.84-8.84m0 8.84 8.84-8.84" stroke="#EB4B4B" strokeLinecap="round"/><path clipRule="evenodd" d="M6.161 23.839c4.882 4.881 12.796 4.881 17.678 0 4.881-4.882 4.881-12.796 0-17.678-4.882-4.881-12.796-4.881-17.678 0-4.881 4.882-4.881 12.796 0 17.678Z" stroke="#000"/></svg> :
          item.status.code === 'p' || item.status.code === 'f' ? 
            <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 16.25 12.5 20l8.75-8.75" stroke="#229B20" strokeLinecap="round"/><path clipRule="evenodd" d="M15 27.5c6.904 0 12.5-5.596 12.5-12.5S21.904 2.5 15 2.5 2.5 8.096 2.5 15 8.096 27.5 15 27.5Z" stroke="#000"/></svg>
          :
            <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12.313v4.374" stroke="#BABE00" strokeLinecap="round"/><path fillRule="evenodd" clipRule="evenodd" d="M15 22.52c.713 0 1.292-.652 1.292-1.457 0-.806-.579-1.459-1.292-1.459-.713 0-1.292.653-1.292 1.459 0 .805.579 1.458 1.292 1.458Z" fill="#BABE00"/><path clipRule="evenodd" d="M14.113 3.806a1 1 0 0 1 1.774 0l11.268 21.628a1 1 0 0 1-.887 1.462H3.732a1 1 0 0 1-.887-1.462L14.113 3.806Z" stroke="#000" strokeLinejoin="round"/></svg>
        }
      </div>
      <div className='profile-history__item-content'>
        <div className='profile-history__item-date'>{getLang('ts_order_from')} {item.date}</div>
        <div className='profile-history__item-status'>№{item.id} - {item.status.name}</div>
      </div>
      <div className='profile-history__item-control'>
        {
          item.pay?.url ?
            <a className='btn' href={item.pay.url} target='_blank'>{item.pay.title}</a> :
          item.pay?.html ?
            <>
              <div ref={payFormWrapper} dangerouslySetInnerHTML={{ __html: item.pay.html }} style={{display: 'none'}} />
              <button className='btn' type='button'
                onClick={() => {
                  let form = payFormWrapper.current.querySelector('form')
                  if (form) {
                    form.submit()
                  }
                }}
              >{item.pay.title}</button>
            </> :
          null
        }
      </div>
    </>
  )
}

export default BookingHistoryItem