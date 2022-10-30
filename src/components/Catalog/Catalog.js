import './Catalog.css'

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  createRef,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md'
import OrderItem from '../OrderItem/OrderItem'

const Catalog = ({ items, categories }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const click = useRef(false)
  const navRef = useRef(null)

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

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      refs.sectionRefs.map((refItem) => {
        const rect = refItem.ref.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          if (!click.current) {
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

  // Menu Scroll
  useEffect(() => {
    if (activeCategoryId) {
      const activeRef = refs.navRefs.find(item => item.id === activeCategoryId)

      if (activeRef) {
        const activeLink = activeRef.ref.current
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
    const category = searchParams.get('category')

    if (category) {
      const activeRef = refs.sectionRefs.find(item => item.id === category)

      if (activeRef) {
        setActiveCategoryId(category)

        click.current = true

        const activeSection = activeRef.ref.current

        window.scrollTo({
          top: activeSection.getBoundingClientRect().top + window.pageYOffset - 126,
          behavior: 'smooth',
        })

        setTimeout(() => {
          click.current = false
        }, 500)
      }
    } else {
      setActiveCategoryId(categories[0].id)
    }
  }

  // SearchParams Change Listener
  useEffect(() => {
    scrollToCategory()
  }, [searchParams])

  // Links Click
  const clickLinkHandler = (id) => {
    if (searchParams.get('category') !== id) {
      searchParams.set('category', id)
      setSearchParams(searchParams)
    } else {
      scrollToCategory()
    }
  }

  // Arrows Click
  const clickArrowHandler = (dir) => {
    let nextRef = null
    const currentRef = refs.navRefs.find(item => item.id === activeCategoryId)
    const currentIndex = refs.navRefs.indexOf(currentRef)

    if (dir === 'prev') {
      nextRef = refs.navRefs[currentIndex - 1]
    } else if (dir === 'next') {
      nextRef = refs.navRefs[currentIndex + 1]
    }

    if (nextRef) {
      clickLinkHandler(nextRef.id)
    }
  }

  return (
    <div className='catalog'>
      <div className='catalog__nav'>
        <div className='container'>
          <div className='catalog__nav-wrapper'>
            <div
              className='catalog__nav-arrow _prev'
              onClick={() => {
                clickArrowHandler('prev')
              }}
            >
              <MdChevronLeft />
            </div>
            <div className='catalog__nav-scroll' ref={navRef}>
              <div className='catalog__nav-list'>
                {categories.map((category, index) => (
                  <span
                    ref={refs.navRefs[index].ref}
                    key={category.id}
                    className={`catalog__nav-btn ${category.id === activeCategoryId ? ' is-active' : ''}`}
                    onClick={() => {
                      clickLinkHandler(category.id)
                    }}
                  >{category.title.split(' (')[0]}</span>
                ))}
              </div>
            </div>
            <div
              className='catalog__nav-arrow _next'
              onClick={() => {
                clickArrowHandler('next')
              }}
            >
              <MdChevronRight />
            </div>
          </div>
        </div>
      </div>

      {categories.map((category, index) => (
        <div
          className='catalog__section'
          ref={refs.sectionRefs[index].ref}
          key={category.id}
        >
          <h2 className='catalog__section-title'>{category.title}</h2>

          {items.filter((item) => item.category === category.title).map(item => (
            <OrderItem
              item={item}
              key={item.id}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Catalog