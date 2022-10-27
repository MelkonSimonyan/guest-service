import './assets/css/var.css'
import './assets/css/main.css'

import React, { useEffect } from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  getInitData,
  selectInit,
} from './features/init/initSlice'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import Lang from './components/Lang/Lang'

const App = () => {
  const dispatch = useDispatch()
  const {
    initData,
    initStatus,
  } = useSelector(selectInit)

  useEffect(() => {
    dispatch(getInitData())
  }, [dispatch])

  if (initStatus === 'loading') {
    return 'Loading...'
  }

  return (
    <>
      <Helmet>
        <title>{initData.hotel.name}</title>
        <style>{initData.hotel.cssStyles}</style>
      </Helmet>

      <ScrollToTop>
        <Header />
        <Outlet />
        <Modal />
        <Lang />
      </ScrollToTop>
    </>
  )
}

export default App
