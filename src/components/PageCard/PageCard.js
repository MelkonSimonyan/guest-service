import './PageCard.css'

import React from 'react'
import { Link } from 'react-router-dom'

const PageCard = ({ page }) => {
  return (
    <Link
      className='page-card'
      to={
        page.type === 'section'
          ? '/page/' + page.id
          : page.type === 'order'
            ? '/page/' + page.id
            : page.type === 'feedback'
              ? '/feedback/'
              : '?modalType=' + page.type + '&modalId=' + page.id
      }
    >
      {page.pic
        ? <div className='page-card__image' style={{ backgroundImage: 'url(' + page.pic + ')' }}></div>
        : page.icon
          ? <div className='page-card__icon'>
            <img src={page.icon} alt={page.title} />
          </div>
          : null
      }
      <div className='page-card__content'>
        <div className='page-card__title'>{page.title}</div>
        {page.subTitle
          ? <div className='page-card__subtitle'>{page.subTitle}</div>
          : null
        }
      </div>
    </Link>
  )
}

export default PageCard