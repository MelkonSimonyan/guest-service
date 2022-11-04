import './PageItem.css'

import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PageItem = ({ page }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const clickHandler = () => {
    if (page.type === 'section') {
      navigate('/page/' + page.id)
    } else if (page.type === 'order') {
      navigate('/page/' + page.id)
    } else if (page.type === 'feedback') {
      navigate('/feedback/')
    } else {
      searchParams.set('modalType', page.type)
      searchParams.set('modalId', page.id)
      setSearchParams(searchParams)
    }
  }

  return (
    <div
      className='page-item'
      onClick={clickHandler}
    >
      {page.pic
        ? <div className='page-item__image' style={{ backgroundImage: 'url(' + page.pic + ')' }}></div>
        : page.icon
          ? <div className='page-item__icon'>
            <img src={page.icon} alt={page.title} />
          </div>
          : null
      }
      <div className='page-item__content'>
        <div className='page-item__title'>{page.title}</div>
        {page.subTitle
          ? <div className='page-item__subtitle'>{page.subTitle}</div>
          : null
        }
      </div>
    </div>
  )
}

export default PageItem