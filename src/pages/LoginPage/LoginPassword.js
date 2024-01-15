import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import API, { headers } from '../../API/API'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectInit } from '../../features/init/initSlice'
import { setUser } from '../../features/user/userSlice'
import { useFetching } from '../../hooks/useFetching'
import { useLang } from '../../hooks/useLang'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import PageMessage from '../../components/PageMessage/PageMessage'

const LoginPassword = ({
  setStep,
  formData,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const [error, setError] = useState(null)

  const [fetchLogin, isLoginLoading, loginError] = useFetching(async (data) => {
    let token = ''

    if (initData.recaptchaKey) {
      token = await recaptchaRef.current.executeAsync()
    }

    const response = await API.authorize({
      ...formData,
      ...data,
      recaptcha: token,
    })

    if (response.data.error) {
      setError(response.data.error)
    } else {
      dispatch(setUser(response.data))
      localStorage.setItem('authToken', response.data.authToken)
      headers.Authorization = 'Bearer ' + response.data.authToken
      navigate('/' + localStorage.getItem('redirectUrl') || '')
      window.location.reload()
    }
  })

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'profile',
      pageTitle: getLang('ts_login_password_title'),
      parentLink: -1
    }))
  }, [])

  const recaptchaRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (loginError || error) {
    return (
      <PageMessage
        type='error'
        subtitle={loginError || error}
        button='reload'
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(fetchLogin)}>
      {isLoginLoading &&
        <div className='loader'></div>
      }

      <div style={{ marginBottom: '-15px' }}>
        <label className='form-label'>{getLang('ts_login_password_label')}</label>
        <div className='form-group'>
          <PasswordInput
            register={register}
            registerData={{
              required: true
            }}
            name={'password'}
            className={'form-control' + (errors.password ? ' error' : '')}
          />
          {errors.password && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>

        <div className='reset-password-btn-row'>
          <button className='reset-password-btn' type='button' onClick={() => {
            setStep('resetPasswordEmail')
            window.history.pushState({ loginStep: 'resetPasswordEmail' }, '', window.location.href)
          }}>{getLang('ts_login_password_reset_btn')}</button>
        </div>

        <div className='form-footer' dangerouslySetInnerHTML={{ __html: getLang('ts_login_footer') }} />
      </div>

      {initData.recaptchaKey ?
        <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={initData.recaptchaKey} /> :
        null
      }

      <div className='footer-btn-wrapper'>
        <div className='container'>
          <div className='footer-btn-row'>
            <div className='footer-btn-col'>
              <button type='submit' className='btn btn_lg'>{getLang('ts_login_password_btn')}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default LoginPassword