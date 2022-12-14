import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { MdOutlineCheckCircleOutline, MdErrorOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import API from '../../API/API'
import { useLang } from '../../hooks/useLang'
import { useFetching } from '../../hooks/useFetching'

const FeedbackPage = () => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const textareaRef = useRef(null)
  const recaptchaRef = useRef()
  const { initData } = useSelector(selectInit)
  const [pageData, setPageData] = useState({})
  const [textareaValue, setTextareaValue] = useState('')
  const [feedbackSuccess, setFeedbackSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const data = initData.pages.find(x => x.type === 'feedback')

    setPageData(data)

    dispatch(setPageInfo({
      pageId: 'feedback',
      pageTitle: data.title,
      parentLink: '/'
    }))
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.rows = 2
      textareaRef.current.rows = parseInt((textareaRef.current.scrollHeight - 22) / 20)
    }
  }, [textareaValue])

  const [fetchFeedback, isFeedbackLoading, feedbackError] = useFetching(async (data) => {
    localStorage.setItem('formDataRoom', data.room)
    localStorage.setItem('formDataName', data.name)
    localStorage.setItem('formDataPhone', data.phone)
    localStorage.setItem('formDataEmail', data.email)

    const token = await recaptchaRef.current.executeAsync()

    const response = await API.feedback({
      ...data,
      text: textareaValue,
      recaptcha: token,
    })

    setFeedbackSuccess(response.data)
  })

  useEffect(() => {
    if (feedbackError || feedbackSuccess?.error) {
      setError(feedbackError || feedbackSuccess.error)
    } else if (feedbackSuccess?.success) {
      setSuccess(feedbackSuccess.success)
    }
  }, [feedbackError, feedbackSuccess])

  if (success) {
    return (
      <div className='page-message'>
        <div className='page-message__content'>
          <div className='page-message__icon' style={{ color: 'var(--success-color)' }}>
            <MdOutlineCheckCircleOutline />
          </div>

          <div className='page-message__subtitle'>
            <span dangerouslySetInnerHTML={{ __html: success.length ? success : getLang('orderSuccess') }}></span>
          </div>

          <Link className='page-message__btn btn btn_lg' to='/'>{getLang('mainMenu')}</Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='page-message'>
        <div className='page-message__content'>
          <div className='page-message__icon' style={{ color: 'var(--error-color)' }}>
            <MdErrorOutline />
          </div>

          <div className='page-message__subtitle'>
            {/* <span dangerouslySetInnerHTML={{ __html: error }}></span> */}
          </div>

          <button type='button'
            className='page-message__btn btn btn_lg'
            onClick={() => {
              window.location.reload()
            }}
          >{getLang('tryAgain')}</button>
        </div>
      </div>
    )
  }

  return (
    <div className='content'>
      <div className='container'>
        <div className='feedback'>
          {pageData.desc ? <div className='page-desc' dangerouslySetInnerHTML={{ __html: pageData.desc }}></div> : null}

          <form onSubmit={handleSubmit(fetchFeedback)}>
            {isFeedbackLoading && (
              <div className='loader _fix'></div>
            )}

            <div style={{ marginBottom: '-15px' }}>
              <div className='form-label'>{getLang('numRoom')}</div>
              <div className='form-group'>
                <select
                  {...register('room', { required: true })}
                  className={'form-select' + (errors.room ? ' error' : '')}
                  defaultValue={localStorage.getItem('formDataRoom')}
                >
                  <option value=''></option>
                  {initData.rooms.map(room => (
                    <option
                      value={room.id}
                      key={room.id}
                    >{room.name}</option>
                  ))}
                </select>
                {errors.room && <div className='form-error'>{getLang('formErrorRequired')}</div>}
              </div>

              <div className='form-label'>{getLang('feedbackTheme')}</div>
              <div className='form-group'>
                <select
                  {...register('theme', { required: true })}
                  className={'form-select' + (errors.theme ? ' error' : '')}
                >
                  <option></option>
                  {initData.feedbackThemes?.map(theme => (
                    <option
                      value={theme}
                      key={theme}
                    >{theme}</option>
                  ))}
                </select>
                {errors.theme && <div className='form-error'>{getLang('formErrorRequired')}</div>}
              </div>

              <div className='form-label'>{getLang('contacts')}</div>
              <div className='form-group form-floating'>
                <input type='text' placeholder='&nbsp;' autoComplete='off'
                  {...register('name', { required: true })}
                  className={'form-control _required' + (errors.name ? ' error' : '')}
                  defaultValue={localStorage.getItem('formDataName') || ''}
                />
                <label className='form-label'>{getLang('formClientName')}</label>
                {errors.name && <div className='form-error'>{getLang('formErrorRequired')}</div>}
              </div>

              <div className='form-group form-floating'>
                <input type='text' placeholder='&nbsp;' autoComplete='off'
                  {...register('phone', { required: true })}
                  className={'form-control _required' + (errors.phone ? ' error' : '')}
                  defaultValue={localStorage.getItem('formDataPhone') || ''}
                />
                <label className='form-label'>{getLang('formPhone')}</label>
                {errors.phone && <div className='form-error'>{getLang('formErrorRequired')}</div>}
              </div>

              <div className='form-group form-floating'>
                <input type='email' placeholder='&nbsp;' autoComplete='off'
                  {...register('email', { required: true })}
                  className={'form-control _required' + (errors.email ? ' error' : '')}
                  defaultValue={localStorage.getItem('formDataEmail') || ''}
                />
                <label className='form-label'>{getLang('formEmail')}</label>
                {errors.email && <div className='form-error'>{getLang('formErrorRequired')}</div>}
              </div>

              <div className='form-group form-floating'>
                <textarea placeholder='&nbsp;' rows='2'
                  {...register('text')}
                  className='form-control'
                  value={textareaValue}
                  ref={textareaRef}
                  onChange={(e) => {
                    setTextareaValue(e.target.value)
                  }}
                ></textarea>
                <label className='form-label'>{getLang('formMessage')}</label>
              </div>
            </div>

            <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={initData.recaptchaKey} />

            <div className='footer-btn-wrapper'>
              <div className='container'>
                <div className='footer-btn-row'>
                  <div className='footer-btn-col'>
                    <button type='submit' className='cart__btn btn btn_lg'>{getLang('send')}</button>
                  </div>
                </div>
              </div>
            </div>

            <div className='footer-btn-placeholder'></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage