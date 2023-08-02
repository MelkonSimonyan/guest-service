import './profilePage.css'

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { selectUser } from '../../features/user/userSlice'
import LoginPage from '../LoginPage/LoginPage'

const ProfilePage = () => {
  const { initData } = useSelector(selectInit)
  const { userData } = useSelector(selectUser)

  if (!initData.user?.loyalty) {
    return <Navigate replace={true} to='/' />
  }

  if (!userData?.userId) {
    return (
      <div className='content'>
        <div className='container'>
          <LoginPage />
        </div>
      </div>
    )
  }
    
  return (
    <div className='content'>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfilePage