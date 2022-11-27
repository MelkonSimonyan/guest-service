import './assets/css/var.css'
import './assets/css/main.css'

import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { selectInit, getInitData } from './features/init/initSlice'
import { selectCart, setCart } from './features/cart/cartSlice'

import HomePage from './pages/HomePage/HomePage'
import CommonPage from './pages/CommonPage/CommonPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import CartPage from './pages/CartPage/CartPage'

import Header from './components/Header/Header'
import CartBtn from './components/CartBtn/CartBtn'
import Modal from './components/Modal/Modal'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData, initStatus } = useSelector(selectInit)
  const { cartProducts } = useSelector(selectCart)

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      dispatch(setCart(JSON.parse(localStorage.getItem('cart'))))
    }
    dispatch(getInitData())
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts))
  }, [cartProducts])

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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Helmet>

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
                <Route path='/cart/' element={<CartPage />} />
                <Route path='/feedback/' element={<div />} />
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
