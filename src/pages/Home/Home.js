import './Home.css'

import React, { useEffect } from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import PageItem from '../../components/PageItem/PageItem'

const Home = () => {
  const { initData } = useSelector(selectInit)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageInfo({
      pageTitle: '',
      parentLink: ''
    }))
  }, [])

  return (
    <div className='content'>
      <div className='container'>
        {initData.pages ?
          <div className='page-grid row'>
            {initData.pages.map((page, index) => (
              <div
                className={`page-grid__item _size_${page.size}`}
                key={page.id + '' + index}
              >
                <PageItem page={page} />
              </div>
            ))}
          </div>
          : null}
      </div>
    </div>
  )
}

export default Home