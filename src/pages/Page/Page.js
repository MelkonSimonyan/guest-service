import React, { useEffect } from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectInit } from '../../features/init/initSlice'
import {
  setCurrentPage,
  selectCurrentPage,
} from '../../features/currentPage/currentPageSlice'
import PageCard from '../../components/PageCard/PageCard'
import { getPage } from '../../utils/getPage'
import OrderItem from '../../components/OrderItem/OrderItem'

const Page = () => {
  const { initData } = useSelector(selectInit)
  const { currentPageData } = useSelector(selectCurrentPage)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    let pageData = getPage(initData.pages, params.id)
    dispatch(setCurrentPage(pageData))
  }, [params.id])

  if (!currentPageData || (!currentPageData.pages && !currentPageData.items)) {
    return null
  }

  return (
    <div className='container'>
      {currentPageData.pages
        ? currentPageData.pages.map((page, index) => (
          <PageCard
            page={page}
            key={page.id + '' + index}
          />
        ))
        : currentPageData.items.map((item) => (
          <OrderItem
            item={item}
            key={item.id}
          />
        ))
      }
    </div>
  )
}

export default Page