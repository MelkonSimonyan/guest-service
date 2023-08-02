import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import API from '../../API/API'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { useFetching } from '../../hooks/useFetching'
import { useLang } from '../../hooks/useLang'
import PageMessage from '../../components/PageMessage/PageMessage'
import BookingHistoryItem from '../../components/BookingHistoryItem/BookingHistoryItem'

const ProfileHistoryPage = () => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const [page, setPage] = useState(0)
  const [bookingList, setBookingList] = useState([])
  const [bookingListAll, setBookingListAll] = useState(null)
  const [loadMoreBtnVisible, setLoadMoreBtnVisible] = useState(true)
  const [error, setError] = useState(null)

  const [fetchBookings, isBookingsLoading, bookingsError] = useFetching(async () => {
    const response = await API.getResource('user/orders')
    
    if (response.data.error) {
      setError(response.data.error)
    } else {
      setBookingListAll(response.data)
    }
  })

  const getBookingPage = (page) => {
    const limit = 3
    setBookingList(bookingList => [
      ...bookingList,
      ...bookingListAll.slice(page * limit, page * limit + limit)
    ])
  }

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'profile',
      pageTitle: getLang('ts_profile_nav_history'),
      parentLink: -1
    }))

    fetchBookings()
  }, [])

  useEffect(() => {
    if (bookingListAll?.length) {
      getBookingPage(page)
    }
  }, [bookingListAll])

  useEffect(() => {
    if (bookingListAll?.length && bookingList?.length === bookingListAll.length) {
      setLoadMoreBtnVisible(false)
    }
  }, [bookingList])

  useEffect(() => {
    if (page > 0) {
      getBookingPage(page)
    }
  }, [page])

  if (bookingsError || error) {
    return (
      <PageMessage
        type='error'
        subtitle={bookingsError || error}
        button='reload'
      />
    )
  }

  if(!isBookingsLoading && !bookingListAll?.length){
    return (
      <PageMessage
        type='success'
        subtitle={getLang('ts_nothing_found')}
        button='back'
      />
    )
  }

  return (
    <div className='profile-history'>
      {isBookingsLoading ?
        <div className='loader'></div>
      : null}

      <>
        <div className='profile-history__list'>
          {bookingList.map(item => (
            <div className='profile-history__item' key={item.id}>
              <BookingHistoryItem item={item} />
            </div>
          ))}
        </div>

        {loadMoreBtnVisible &&
          <div className='profile-history__load-more'>
            <button type='button'
              className='btn'
              onClick={() => {
                setPage(page => page + 1)
              }}
            >
              {getLang('ts_load_more_booking')}
            </button>
          </div>
        }
      </>
    </div>
  )
}

export default ProfileHistoryPage