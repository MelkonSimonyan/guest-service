import './loginPage.css'

import React, { useEffect, useState } from 'react'

import LoginEmail from './LoginEmail'
import LoginPassword from './LoginPassword'
import ResetPasswordEmail from './ResetPasswordEmail'
import ResetPassword from './ResetPassword'
import Registration from './Registration'

const LoginPage = () => {
  const [formData, setFormData] = useState(null)
  const [step, setStep] = useState('loginEmail')

  const onPop = e => {
    if(e.state?.loginStep){
      setStep(e.state.loginStep)
    } else {
      setStep('loginEmail')
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <>
      {step === 'loginEmail' || !formData ?
        <LoginEmail
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        /> :
      step === 'loginPassword' ?
        <LoginPassword
          setStep={setStep}
          formData={formData}
        /> :
      step === 'resetPasswordEmail' ?
        <ResetPasswordEmail
          setStep={setStep}
          formData={formData}
        /> :
      step === 'resetPassword' ?
        <ResetPassword
          formData={formData}
        /> :
      step === 'registration' ? 
        <Registration
          formData={formData}
        /> :
      null
      }
    </>
  )
}

export default LoginPage