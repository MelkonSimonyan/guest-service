import './assets/css/var.css'
import './assets/css/main.css'

import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { selectInit, getInitData } from './features/init/initSlice'
import { selectCart, setCart } from './features/cart/cartSlice'

import { getStores } from './utils/getStores'

import HomePage from './pages/HomePage/HomePage'
import CommonPage from './pages/CommonPage/CommonPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import CartPage from './pages/CartPage/CartPage'

import Header from './components/Header/Header'
import CartBtn from './components/CartBtn/CartBtn'
import Modal from './components/Modal/Modal'
import FeedbackPage from './pages/FeedbackPage/FeedbackPage'
import OrderPage from './pages/OrderPage/OrderPage'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData, initStatus } = useSelector(selectInit)
  const { carts } = useSelector(selectCart)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('room')) {
      localStorage.setItem('formDataRoom', searchParams.get('room'))
    }

    dispatch(getInitData())
  }, [])

  useEffect(() => {
    if (initData) {
      let stores = getStores(initData.pages)

      if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length === stores.length) {
        stores = JSON.parse(localStorage.getItem('cart'))
      }
      dispatch(setCart(stores))
    }
  }, [initData])

  useEffect(() => {
    if (carts?.length) {
      localStorage.setItem('cart', JSON.stringify(carts))
    }
  }, [carts])

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location.pathname])

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href={`${process.env.REACT_APP_WIDGET_URL}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${process.env.REACT_APP_WIDGET_URL}/favicon192.png`} />
        {/* <link rel="manifest" href={`${process.env.REACT_APP_WIDGET_URL}/manifest.json`} /> */}
      </Helmet>

      <CSSTransition
        in={initStatus === 'loading'}
        timeout={500}
        unmountOnExit
      >
        <div className='loader _start'></div>
      </CSSTransition>

      {initStatus === 'loading' ? null :
        <>
          <Helmet>
            <html lang={initData.lang} />
            <title>{initData.hotel.name}</title>
            <style type="text/css">{initData.hotel.cssStyles}</style>
          </Helmet>

          <Header />

          <TransitionGroup className='content-wrapper'>
            <CSSTransition
              key={location.pathname}
              timeout={300}
              classNames={'content'}
            >
              <Routes location={location}>
                <Route path='/' element={<HomePage />} />
                <Route path='/page/:id' element={<CommonPage />} />
                <Route path='/catalog/:id' element={<CatalogPage />} />
                <Route path='/cart/:id' element={<CartPage />} />
                <Route path='/cart/' element={<CartPage />} />
                <Route path='/feedback/' element={<FeedbackPage />} />
                <Route path='/order/:id' element={<OrderPage />} />
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>

          <CartBtn />

          <Modal />
        </>
      }
    </>
  )
}

export default App
