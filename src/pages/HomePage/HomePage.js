import './HomePage.css'

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import PageItem from '../../components/PageItem/PageItem'

const HomeBanner = ({ link, blank, children }) => {
  if (link) {
    if (blank) {
      return (
        <a className='home-banner' href={link} target='_blank'>{children}</a>
      )
    }

    return (
      <Link className='home-banner' to={link}>{children}</Link>
    )
  }

  return (
    <div className='home-banner'>{children}</div>
  )
}

const HomePage = () => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: '',
      pageTitle: '',
      parentLink: ''
    }))
  }, [])

  return (
    <div className='content'>
      <div className='container'>
        {initData.hotel?.banner?.pic ?
          <HomeBanner
            link={initData.hotel.banner.link}
            blank={initData.hotel.banner.blank}
          >
            <LazyLoadImage
              src={initData.hotel.banner.pic}
              alt=''
              effect='opacity'
            />
          </HomeBanner> : null
        }

        {initData.pages ?
          <div className='page-grid row'>
            {initData.pages.map((page) => (
              <div
                className={`page-grid__item _size_${page.size}`}
                key={page.id}
              >
                <PageItem page={page} />
              </div>
            ))}
          </div> : null}
      </div>
    </div>
  )
}

export default HomePage