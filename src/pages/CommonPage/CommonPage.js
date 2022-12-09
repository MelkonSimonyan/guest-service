import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { getPage } from '../../utils/getPage'

import PageItem from '../../components/PageItem/PageItem'

const CommonPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { initData } = useSelector(selectInit)
  const [pageData, setPageData] = useState({})

  useEffect(() => {
    const data = getPage(initData.pages, params.id)

    setPageData(data)

    dispatch(setPageInfo({
      pageId: data.id,
      pageTitle: data.title,
      parentLink: data.parentLink
    }))
  }, [params.id])

  return (
    <div className='content'>
      <div className='container'>
        {pageData.desc ? <div className='page-desc' dangerouslySetInnerHTML={{ __html: pageData.desc }}></div> : null}

        {pageData.pages ?
          <div className='page-grid row'>
            {pageData.pages.map((page) => (
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

export default CommonPage