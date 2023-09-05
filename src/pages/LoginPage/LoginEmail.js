import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

import API from '../../API/API'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { selectInit } from '../../features/init/initSlice'
import { useLang } from '../../hooks/useLang'
import { useFetching } from '../../hooks/useFetching'
import PageMessage from '../../components/PageMessage/PageMessage'

const LoginEmail = ({
  setStep,
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const { initData } = useSelector(selectInit)

  const [fetchUserHas, isUserHasLoading, userHasError] = useFetching(async (data) => {
    let token = ''

    if (initData.recaptchaKey) {
      token = await recaptchaRef.current.executeAsync()
    }

    const response = await API.hasUser({
      ...data,
      recaptcha: token,
    })

    setFormData(formData => ({
      ...formData,
      ...data
    }))

    setTimeout(() => {
      if (response.data.success) {
        setStep('loginPassword')
        window.history.pushState({ loginStep: 'loginPassword' }, '', window.location.href)
      } else {
        setStep('registration')
        window.history.pushState({ loginStep: 'registration' }, '', window.location.href)
      }
    }, 100)
  })

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'profile',
      pageTitle: getLang('ts_login_email_title'),
      parentLink: window.history.state?.key ? -1 : '/'
    }))
  }, [])

  const recaptchaRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (userHasError) {
    return (
      <PageMessage
        type='error'
        subtitle={userHasError}
        button='reload'
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(fetchUserHas)}>
      {isUserHasLoading && (
        <div className='loader'></div>
      )}

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
            defaultValue={formData?.email || ''}
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
              <button type='submit' className='btn btn_lg'>{getLang('ts_login_email_btn')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-btn-placeholder'></div>
    </form>
  )
}

export default LoginEmail