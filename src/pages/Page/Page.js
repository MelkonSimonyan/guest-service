import React, { useEffect, useState } from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import PageItem from '../../components/PageItem/PageItem'
import { getPage } from '../../utils/getPage'
import Catalog from '../../components/Catalog/Catalog'

const Page = () => {
  const { initData } = useSelector(selectInit)
  const dispatch = useDispatch()
  const params = useParams()
  const [pageData, setPageData] = useState({})
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const data = getPage(initData.pages, params.id)
    dispatch(setPageInfo({
      pageTitle: data.title,
      parentLink: data.parentLink
    }))
    setPageData(data)
  }, [params.id])

  useEffect(() => {
    if (pageData.items) {
      let cats = []

      pageData.items.map(item => {
        if (!cats.find(category => category.title === item.category)) {
          cats.push({
            id: item.category.split(' (')[0],
            title: item.category
          })
        }
      })

      setCategories(cats)
    }
  }, [pageData])

  return (
    <div className='content'>
      <div className='container'>
        {pageData.pages
          ? pageData.pages.map((page, index) => (
            <PageItem
              page={page}
              key={page.id + '' + index}
            />
          ))
          : categories
            ? <Catalog items={pageData.items} categories={categories} />
            : null
        }
      </div>
    </div>
  )
}

export default Page