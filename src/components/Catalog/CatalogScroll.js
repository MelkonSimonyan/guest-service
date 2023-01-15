import React, { useEffect, useState, useMemo, useRef, createRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import CatalogItem from '../CatalogItem/CatalogItem'

const CatalogScroll = ({
  categories,
  items,
  storeId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const menuClicked = useRef(true)
  const navRef = useRef(null)

  // Scroll Listener
  useEffect(() => {
    setTimeout(() => {
      menuClicked.current = false
    }, 500)

    const handleScroll = () => {
      refs.sectionRefs.map((refItem) => {
        const rect = refItem.ref.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          if (!menuClicked.current) {
            setActiveCategoryId(refItem.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [])

  // Construct Refs
  const refs = useMemo(() => {
    const refs = {
      navRefs: [],
      sectionRefs: [],
    }

    categories.map((category) => {
      refs.navRefs.push({
        id: category.id,
        ref: createRef(null)
      })

      refs.sectionRefs.push({
        id: category.id,
        ref: createRef(null)
      })
    })

    return refs
  }, [])

  // Second Menu Scroll
  useEffect(() => {
    if (activeCategoryId) {
      const activeLinkRef = refs.navRefs.find(ref => ref.id === activeCategoryId)

      if (activeLinkRef && navRef?.current) {
        const activeLink = activeLinkRef.ref.current
        const nav = navRef.current

        nav.scrollTo({
          left: nav.scrollLeft + activeLink.getBoundingClientRect().left - nav.getBoundingClientRect().left,
          behavior: 'smooth',
        })
      }
    }
  }, [activeCategoryId])

  // Page Scroll
  const scrollToCategory = () => {
    const category = parseInt(searchParams.get('category'))

    if (category) {
      const activeSectionRef = refs.sectionRefs.find(item => item.id === category)

      if (activeSectionRef) {
        setActiveCategoryId(category)

        menuClicked.current = true

        const activeSection = activeSectionRef.ref.current

        if (activeSection) {
          window.scrollTo({
            top: activeSection.getBoundingClientRect().top + window.pageYOffset - (80 + document.querySelectorAll('.catalog__nav').length * 56),
            behavior: 'smooth',
          })

          setTimeout(() => {
            menuClicked.current = false
          }, 500)
        }
      }
    } else {
      setActiveCategoryId(categories[0].id)
    }
  }

  // SearchParams Change Listener
  useEffect(() => {
    setTimeout(() => {
      scrollToCategory()
    })
  }, [searchParams])

  // Links Click
  const clickLinkHandler = (id) => {
    if (parseInt(searchParams.get('category')) !== id) {
      searchParams.set('category', id)
      setSearchParams(searchParams)
    } else {
      scrollToCategory()
    }
  }

  // Arrows Click
  const clickArrowHandler = (dir) => {
    let nextLinkRef = null
    const currentLinkRef = refs.navRefs.find(item => item.id === activeCategoryId)
    const currentLinkIndex = refs.navRefs.indexOf(currentLinkRef)

    if (dir === 'prev') {
      nextLinkRef = refs.navRefs[currentLinkIndex - 1]
    } else if (dir === 'next') {
      nextLinkRef = refs.navRefs[currentLinkIndex + 1]
    }

    if (nextLinkRef) {
      clickLinkHandler(nextLinkRef.id)
    }
  }

  return (
    <>
      <div className='catalog__nav'>
        <div className='catalog__nav-wrapper'>
          <div className='catalog__nav-scroll' ref={navRef}>
            <div className='catalog__nav-list'>
              {categories.map((category, index) => (
                <button
                  type='button'
                  ref={refs.navRefs[index].ref}
                  key={category.id}
                  className={`catalog__nav-btn ${category.id === activeCategoryId ? ' is-active' : ''}`}
                  onClick={() => {
                    clickLinkHandler(category.id)
                  }}
                >{category.name}</button>
              ))}
            </div>
          </div>

          {/*
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
          */}
        </div>
      </div>

      {categories.map((category, index) => {
        return (
          <div
            className='catalog__section'
            ref={refs.sectionRefs[index].ref}
            key={category.id}
          >
            <h2 className='catalog__section-title'>{category.name}</h2>

            {items.filter((item) => item.categoryId === category.id).map(item => (
              <CatalogItem
                item={item}
                storeId={storeId}
                key={item.id}
              />
            ))}
          </div>
        )
      })}
    </>
  )
}

export default CatalogScroll