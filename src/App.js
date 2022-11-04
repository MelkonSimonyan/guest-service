import './assets/css/var.css'
import './assets/css/main.css'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { getInitData, selectInit } from './features/init/initSlice'
import { selectPageInfo } from './features/pageInfo/pageInfoSlice'
import Home from './pages/Home/Home'
import Page from './pages/Page/Page'
import Cart from './pages/Cart/Cart'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import Languages from './components/Languages/Languages'
import Menu from './components/Menu/Menu'
import CartBtn from './components/CartBtn/CartBtn'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData, initStatus } = useSelector(selectInit)
  const { pageId } = useSelector(selectPageInfo)

  useEffect(() => {
    dispatch(getInitData())
  }, [dispatch])

  return (
    <>
      <CSSTransition
        in={initStatus === 'loading'}
        timeout={500}
        unmountOnExit
      >
        <div className='loader'></div>
      </CSSTransition>

      {initStatus === 'loading' ? null :
        <>
          <Helmet>
            <title>{initData.hotel.name}</title>
            <style>{initData.hotel.cssStyles}</style>
          </Helmet>

          <ScrollToTop>
            <Header />

            <TransitionGroup className='content-wrapper'>
              <CSSTransition
                key={location.pathname}
                timeout={300}
                classNames={'content'}
              >
                <Routes location={location}>
                  <Route path='/' element={<Home />} />
                  <Route path='/page/:id' element={<Page />} />
                  <Route path='/cart/' element={<Cart />} />
                  <Route path='*' element={<Navigate to='/' />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>

            {pageId === 'cart' ? null : <CartBtn />}

            <Modal />
            <Languages />
            <Menu />
          </ScrollToTop>
        </>
      }
    </>
  )
}

export default App
