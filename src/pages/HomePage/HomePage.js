import './HomePage.css'

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import PageItem from '../../components/PageItem/PageItem'

const HomeBanner = ({ pic, link, blank }) => {
  if (link) {
    if (blank) {
      return (
        <a className='home-banner' href={link} target='_blank'>
          <img src={pic} alt='' />
        </a>
      )
    }

    return (
      <Link className='home-banner' to={link}>
        <img src={pic} alt='' />
      </Link>
    )
  }

  return (
    <div className='home-banner'>
      <img src={pic} alt='' />
    </div>
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
            pic={initData.hotel.banner.pic}
            link={initData.hotel.banner.link}
            blank={initData.hotel.banner.blank}
          /> : null
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