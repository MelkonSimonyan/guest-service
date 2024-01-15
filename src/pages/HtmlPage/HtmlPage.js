import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { getPage } from '../../utils/getPage'

const HtmlPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { initData } = useSelector(selectInit)
  const [pageData, setPageData] = useState({})

  useEffect(() => {
    function messageEvent(e){
      if(e.data['event'] == 'buy-sert'){
        window.location = e.data['data']
      } else {
        try {
          if (e.data.indexOf('resize::') != -1){
            var height = e.data.replace('resize::', '')
            document.getElementById('adg-certificate-iframe').style.height = height + 'px';
          }
        } catch(e) {}
      }
    }

    window.addEventListener('message', messageEvent)
    return () => window.removeEventListener('message', messageEvent)
  }, [])

  useEffect(() => {
    const data = getPage(initData.pages, params.id)

    setPageData(data)

    dispatch(setPageInfo({
      pageId: 'page-html',
      pageTitle: data.title,
      parentLink: data.parentLink
    }))
  }, [params.id])

  return (
    <div className='content'>
      <div className='container'>
        <div className='iframe-wrapper' dangerouslySetInnerHTML={{__html: pageData.desc}} />
      </div>
    </div>
  )
}

export default HtmlPage