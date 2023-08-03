import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import API from '../../API/API'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'
import { setUser, selectUser } from '../../features/user/userSlice'
import { useLang } from '../../hooks/useLang'
import { useFetching } from '../../hooks/useFetching'
import PageMessage from '../../components/PageMessage/PageMessage'

const ProfileDataPage = () => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const { userData } = useSelector(selectUser)

  const [fetchUpdateProfile, isUpdateProfileLoading, updateProfileError] = useFetching(async (data) => {
    const response = await API.updateProfile(data)

    if (response.data.success) {
      dispatch(setUser({
        ...userData,
        profile: {
          ...userData.profile,
          ...data
        }
      }))

      setSuccess(response.data.success)
    } else if (response.data.error) {
      setError(response.data.error)
    }
  })

  useEffect(() => {
    dispatch(setPageInfo({
      pageId: 'profile',
      pageTitle: getLang('ts_profile'),
      parentLink: -1
    }))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (updateProfileError || error) {
    return (
      <PageMessage
        type='error'
        subtitle={updateProfileError || error}
        button='reload'
      />
    )
  }

  if (success) {
    return (
      <PageMessage
        type='success'
        title={getLang('ts_profile_edit_success_title')}
        subtitle={getLang('ts_profile_edit_success_text')}
        button='back'
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(fetchUpdateProfile)}>
      {isUpdateProfileLoading && (
        <div className='loader'></div>
      )}

      <div style={{ marginBottom: '-15px' }}>
        <label className='form-label'>{getLang('ts_login_name_label')}</label>
        <div className='form-group'>
          <input
            {...register('name', {
              required: true
            })}
            type='text'
            autoComplete='off'
            className={'form-control' + (errors.name ? ' error' : '')}
            defaultValue={userData.profile.name}
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
            defaultValue={userData.profile.surname}
          />
          {errors.surname && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>

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
            defaultValue={userData.profile.email}
          />
          {errors.email && <div className='form-error'>{errors.email.message}</div>}
        </div>

        <label className='form-label'>{getLang('ts_login_phone_label')}</label>
        <div className='form-group'>
          <input
            {...register('phone', {
              required: true
            })}
            type='tel'
            autoComplete='off'
            className={'form-control' + (errors.phone ? ' error' : '')}
            defaultValue={userData.profile.phone}
          />
          {errors.phone && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>

        <label className='form-label'>{getLang('ts_login_birthday_label')}</label>
        <div className='form-group'>
          <input
            {...register('birthday', {
              required: true
            })}
            type='text'
            autoComplete='off'
            className={'form-control' + (errors.birthday ? ' error' : '')}
            defaultValue={userData.profile.birthday}
          />
          {errors.birthday && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>

        <label className='form-label'>{getLang('ts_login_gender_label')}</label>
        <div className='form-group'>
          <select
            {...register('gender', {
              required: true,
            })}
            className={'form-select' + (errors.gender ? ' error' : '')}
            defaultValue={userData.profile.gender}
          >
            <option value=''></option>
            <option value='male'>{getLang('ts_gender_male')}</option>
            <option value='female'>{getLang('ts_gender_female')}</option>
          </select>
          {errors.gender && <div className='form-error'>{getLang('form_error_required')}</div>}
        </div>
      </div>

      <div className='footer-btn-wrapper'>
        <div className='container'>
          <div className='footer-btn-row'>
            <div className='footer-btn-col'>
              <button type='submit' className='btn btn_lg'>{getLang('ts_save')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-btn-placeholder'></div>
    </form>
  )
}

export default ProfileDataPage