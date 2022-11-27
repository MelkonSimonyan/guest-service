import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { getPage } from '../../utils/getPage'

import Catalog from '../../components/Catalog/Catalog'

const CatalogPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { initData } = useSelector(selectInit)
  const [pageData, setPageData] = useState({})
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const data = getPage(initData.pages, params.id)

    setPageData(data)

    dispatch(setPageInfo({
      pageId: data.id,
      pageTitle: data.title,
      parentLink: data.parentLink
    }))
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
        {categories ?
          <Catalog items={pageData.items} categories={categories} /> : null
        }
      </div>
    </div>
  )
}

export default CatalogPage