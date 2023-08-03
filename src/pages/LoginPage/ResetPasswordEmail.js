import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

import API from '../../API/API'
import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { useLang } from '../../hooks/useLang'
import { useFetching } from '../../hooks/useFetching'
import PageMessage from '../../components/PageMessage/PageMessage'

const ResetPassword = ({
  setStep,
  formData,
}) => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const { initData } = useSelector(selectInit)
  const [error, setError] = useState(null)

  const [fetchResetPasswordEmail, isResetPasswordEmailLoading, resetPasswordEmailError] = useFetching(async (data) => {
    let token = ''

    if (initData.recaptchaKey) {
        token = await recaptchaRef.current.executeAsync()
    }

    const response = await API.sendPassword({
      ...data,
      recaptcha: token,
    })

    if (response.data.success) {
      setStep('resetPassword')
      window.history.pushState({ loginStep: 'resetPassword' }, '', window.location.href)
    } else if (response.data.error) {
      setError(response.data.error)
    }
  })

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'profile',
      pageTitle: getLang('ts_login_reset_password_email_title'),
      parentLink: -1
    }))
  }, [])

  const recaptchaRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (resetPasswordEmailError || error) {
    return (
      <PageMessage
        type='error'
        subtitle={resetPasswordEmailError || error}
        button='reload'
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(fetchResetPasswordEmail)}>
      <div className='page-desc'>{getLang('ts_login_reset_password_email_lead')}</div>

      {isResetPasswordEmailLoading && 
        <div className='loader'></div>
      }

      <div style={{ marginBottom: '-15px' }}>
        <label className='form-label'>{getLang('ts_login_email_label')}</label>
        <div className='form-group'>
          <input
            {...register('email', {
              required: getLang('form_error_required'),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: getLang('form_error_email'),
              },
            })}
            type='email'
            autoComplete='off'
            className={'form-control' + (errors.email ? ' error' : '')}
            defaultValue={formData.email}
          />
          {errors.email && <div className='form-error'>{errors.email.message}</div>}
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
              <button type='submit' className='btn btn_lg'>{getLang('ts_login_reset_password_email_btn')}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ResetPassword