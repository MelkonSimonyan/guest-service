import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import API, { headers } from '../../API/API'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectInit } from '../../features/init/initSlice'
import { setUser } from '../../features/user/userSlice'
import { useLang } from '../../hooks/useLang'
import { useFetching } from '../../hooks/useFetching'
import PageMessage from '../../components/PageMessage/PageMessage'
import PasswordInput from '../../components/PasswordInput/PasswordInput'

const Registration = ({
  formData,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getLang = useLang()
  const [error, setError] = useState(null)
  const { initData } = useSelector(selectInit)

  const [fetchRegistration, isRegistrationLoading, registrationError] = useFetching(async (data) => {
    let token = ''

    if (initData.recaptchaKey) {
        token = await recaptchaRef.current.executeAsync()
    }

    const response = await API.registration({
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
      navigate('/')
    }
  })

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'profile',
      pageTitle: getLang('ts_registration_header'),
      parentLink: -1
    }))
  }, [])

  const recaptchaRef = useRef()

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (registrationError || error) {
    return (
      <PageMessage
        type='error'
        subtitle={registrationError || error}
        button='reload'
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(fetchRegistration)}>
      {isRegistrationLoading && (
        <div className='loader'></div>
      )}

      <div style={{ marginBottom: '-15px' }}>
        <div className='page-desc text-center' dangerouslySetInnerHTML={{  __html:  getLang('ts_login_name_lead')}}/>

        <label className='form-label'>{getLang('ts_login_name_label')}</label>
        <div className='form-group'>
          <input
            {...register('name', {
              required: true
            })}
            type='text'
            autoComplete='off'
            className={'form-control' + (errors.name ? ' error' : '')}
          />
          {errors.name && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>

        <label className='form-label'>{getLang('ts_login_surname_label')}</label>
        <div className='form-group'>
          <input
            {...register('surname', {
              required: true
            })}
            type='text'
            autoComplete='off'
            className={'form-control' + (errors.surname ? ' error' : '')}
          />
          {errors.surname && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>

        <label className='form-label'>{getLang('ts_login_phone_label')} <small>{getLang('ts_login_phone_lead')}</small></label>
        <div className='form-group'>
          <input
            {...register('phone', {
              required: true
            })}
            type='tel'
            autoComplete='off'
            className={'form-control' + (errors.phone ? ' error' : '')}
          />
          {errors.phone && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>

        <label className='form-label'>{getLang('ts_login_create_password_label')} <small>{getLang('ts_login_create_password_lead')}</small></label>
        <div className='form-group'>
          <PasswordInput
            register={register}
            registerData={{
              required: getLang('form_error_required'),
              minLength: {
                value: 6,
                message: (getLang('form_error_min_length').replace(':num', 6))
              },
            }}
            name={'password'}
            className={'form-control' + (errors.password ? ' error' : '')}
          />
          {errors.password && <div className='form-error'>{errors.password.message}</div>}
        </div>

        <label className='form-label'>{getLang('ts_login_create_repassword_label')}</label>
        <div className='form-group'>
          <PasswordInput
            register={register}
            registerData={{
              required: getLang('form_error_required'),
              validate: (val) => {
                if (watch('password') != val) {
                  return getLang('form_error_equal')
                }
              }
            }}
            name={'repassword'}
            className={'form-control' + (errors.repassword ? ' error' : '')}
          />
          {errors.repassword && <div className='form-error'>{errors.repassword.message}</div>}
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
              <button type='submit' className='btn btn_lg'>{getLang('ts_login_create_password_btn')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-btn-placeholder'></div>
    </form>
  )
}

export default Registration