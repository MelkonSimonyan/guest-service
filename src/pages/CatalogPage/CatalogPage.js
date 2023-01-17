import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { getStore } from '../../utils/getStore'

import Catalog from '../../components/Catalog/Catalog'
import { isClose } from '../../utils/isClose'

const CatalogPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { initData } = useSelector(selectInit)
  const [pageData, setPageData] = useState({})
  const [close, setClose] = useState(false)

  useEffect(() => {
    const data = getStore(initData.pages, params.storeId)

    if (data) {
      if (data.storeWorkTime && isClose(data.storeWorkTime.from, data.storeWorkTime.to)) {
        setClose(data.noWorkMessage || 'Close')
      }

      setPageData(data)

      dispatch(setPageInfo({
        pageId: 'catalog/' + params.storeId,
        pageTitle: data.title,
        parentLink: data.parentLink
      }))
    } else {
      navigate('/')
    }
  }, [params.storeId])

  return (
    <div className='content'>
      <div className='container'>
        {pageData.banner?.pic ?
          <div className='catalog-banner'>
            <a
              href={pageData.banner.link}
              className='catalog-banner__link'
              style={{ backgroundImage: 'url(' + pageData.banner.pic + ')' }}
            >
              <div className='catalog-banner__content'>
                <div className='catalog-banner__title'>{pageData.banner.title}</div>
                <div className='catalog-banner__subtitle'>{pageData.banner.title2}</div>
              </div>
            </a>
          </div> : null
        }

        {close ?
          <div className='close-message'>
            <FiAlertTriangle />
            <div>{close}</div>
          </div> :

          pageData.categories ?
            <Catalog
              items={pageData.items}
              categories={pageData.categories}
              storeId={parseInt(params.storeId)}
              categoryId={parseInt(params.categoryId) || pageData.categories.find(category => category.category_id === 0).id}
            /> : null
        }
      </div>
    </div>
  )
}

export default CatalogPage