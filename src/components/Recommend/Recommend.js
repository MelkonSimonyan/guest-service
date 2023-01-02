import './recommend.css'

import React, { useEffect, useState } from 'react'

import { selectInit } from '../../features/init/initSlice'
import { useLang } from '../../hooks/useLang'
import { useFetching } from '../../hooks/useFetching'
import API from '../../API/API'
import { getStore } from '../../utils/getStore'
import { useSelector } from 'react-redux'
import CatalogItem from '../CatalogItem/CatalogItem'

const Recommend = ({
  card,
  storeId
}) => {
  const { initData } = useSelector(selectInit)
  const getLang = useLang()
  const [items, setItems] = useState(null)
  const [recommendIds, setRecommendIds] = useState([])

  const [fetchRecommend, isRecommendLoading, recommendError] = useFetching(async () => {
    const response = await API.recommend({
      card,
    }, storeId)
    setRecommendIds(response.data)
  })

  useEffect(() => {
    const { items } = getStore(initData.pages, storeId)
    setItems(items)

    fetchRecommend()
  }, [])

  if (!recommendIds.length) {
    return null
  }

  return (
    <div className='reccommend'>
      <h4>{getLang('addToOrder')}</h4>
      <div className='reccommend-slider'>
        <div className='reccommend-slider__inner'>
          {items.filter(item => recommendIds.includes(item.id)).map(item => (
            <CatalogItem
              item={item}
              storeId={storeId}
              type='small'
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recommend