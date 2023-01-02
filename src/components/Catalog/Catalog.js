import './Catalog.css'

import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import CatalogScroll from './CatalogScroll'
import CatalogStatic from './CatalogStatic'

const Catalog = ({
  categories,
  items,
  storeId,
  categoryId,
}) => {
  const navigate = useNavigate()
  const menuClicked = useRef(true)
  const navRef = useRef(null)
  const activeLinkRef = useRef(null)

  useEffect(() => {
    if (categoryId && (!categories.find(category => category.id === categoryId) || categories.find(category => category.id === categoryId).category_id !== 0)) {
      navigate('/catalog/' + storeId)
    } else {
      setTimeout(() => {
        menuClicked.current = false
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (activeLinkRef?.current && navRef?.current) {
      const activeLink = activeLinkRef.current
      const nav = navRef.current

      nav.scrollTo({
        left: nav.scrollLeft + activeLink.getBoundingClientRect().left - nav.getBoundingClientRect().left,
        behavior: 'smooth',
      })
    }
  }, [categoryId])

  const clickArrowHandler = (dir) => {
    let id
    let cat = categories.filter(category => category.category_id === 0)
    let item = cat.find(category => category.id === categoryId)

    if (dir === 'prev') {
      id = cat[cat.indexOf(item) - 1]?.id
    } else if (dir === 'next') {
      id = cat[cat.indexOf(item) + 1]?.id
    }

    if (id) {
      navigate('/catalog/' + storeId + '/' + id)
    }
  }

  return (
    <>
      {categories.find(category => category.category_id !== 0) ?
        <div className='catalog'>
          <div className='catalog__nav'>
            <div className='catalog__nav-wrapper'>
              <div className='catalog__nav-scroll' ref={navRef}>
                <div className='catalog__nav-list'>
                  {categories.filter(category => category.category_id === 0).map((category) => (
                    <Link
                      to={`/catalog/${storeId}/${category.id}`}
                      key={category.id}
                      ref={category.id === categoryId ? activeLinkRef : null}
                      className={`catalog__nav-btn ${category.id === categoryId ? ' is-active' : ''}`}
                    >{category.name}</Link>
                  ))}
                </div>
              </div>

              <button
                type='button'
                className='catalog__nav-arrow _prev'
                onClick={() => {
                  clickArrowHandler('prev')
                }}
              ><MdChevronLeft /></button>

              <button
                type='button'
                className='catalog__nav-arrow _next'
                onClick={() => {
                  clickArrowHandler('next')
                }}
              ><MdChevronRight /></button>
            </div>
          </div>

          {categories.find(category => category.category_id === categoryId) ?
            <CatalogScroll
              categories={categories.filter(category => category.category_id === categoryId)}
              items={items}
              storeId={storeId}
            /> :
            <CatalogStatic
              categories={categories.filter(category => category.id === categoryId)}
              items={items}
              storeId={storeId}
            />
          }
        </div> :
        <div className='catalog'>
          <CatalogScroll
            categories={categories}
            items={items}
            storeId={storeId}
          />
        </div>
      }
    </>
  )
}

export default Catalog