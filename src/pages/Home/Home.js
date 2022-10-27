import './Home.css'

import React, { useEffect } from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import { selectInit } from '../../features/init/initSlice'
import {
  setCurrentPage,
  selectCurrentPage,
} from '../../features/currentPage/currentPageSlice'
import PageCard from '../../components/PageCard/PageCard'

const Home = () => {
  const { initData } = useSelector(selectInit)
  const { currentPageData } = useSelector(selectCurrentPage)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentPage({
      ...initData,
      parentId: ''
    }))
  }, [])

  if (!currentPageData || !currentPageData.pages) {
    return null
  }

  return (
    <div className='container'>
      <div className='page-grid row'>
        {currentPageData.pages.map((page, index) => (
          <div
            className={`page-grid__item _size_${page.size}`}
            key={page.id + '' + index}
          >
            <PageCard page={page} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home