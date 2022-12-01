import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import { selectInit } from '../../features/init/initSlice'
import {
  selectVisibility,
  langHide,
} from '../../features/visibility/visibilitySlice'

import { useLang } from '../../hooks/useLang'

import ModalLayout from '../Modal/ModalLayout'

const Languages = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData } = useSelector(selectInit)
  const { langVisible } = useSelector(selectVisibility)
  const [selectedLang, setSelectedLang] = useState('')
  const getLang = useLang()

  const hideLanguages = () => {
    dispatch(langHide())
  }

  const changeLangTemp = (lang) => {
    setSelectedLang(lang)
  }

  const changeLang = () => {
    localStorage.setItem('lang', selectedLang)
    hideLanguages()
    window.location.reload()
  }

  useEffect(() => {
    setSelectedLang(initData.lang)
  }, [])

  useEffect(() => {
    if (langVisible) {
      hideLanguages()
    }
  }, [location.pathname])

  return (
    <ModalLayout
      visible={langVisible}
      close={hideLanguages}
      footer={<button
        type='button'
        className='btn btn_lg'
        onClick={changeLang}
      >{getLang('ChooseLanguage')}</button>}
    >
      <div className='modal__header'>
        <h2 className='modal__title'>{getLang('languages')}</h2>
      </div>

      <div className='modal-list'>
        {Object.entries(initData.langs).map(([key, lang]) => (
          <div
            className={`modal-list__item ${lang.code === selectedLang ? 'is-active' : ''}`}
            key={key}
            onClick={() => {
              changeLangTemp(lang.code)
            }}
          >
            <span
              className='modal-list__flag'
              style={{
                backgroundImage: `url(${process.env.REACT_APP_WIDGET_URL}/assets/images/lang/flag-${lang.code}.svg)`
              }}></span>

            <span className='modal-list__text'>{lang.name}</span>

            {lang.code === selectedLang ?
              <span className='modal-list__select-icon'>
                <BsFillCheckCircleFill />
              </span> : ''
            }
          </div>
        ))}
      </div>
    </ModalLayout>
  )
}

export default Languages
