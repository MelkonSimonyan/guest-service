import './Languages.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { selectInit } from '../../features/init/initSlice'
import { langHide, selectVisibility } from '../../features/visibility/visibilitySlice'
import { useLang } from '../../hooks/useLang'
import ModalLayout from '../Modal/ModalLayout'

const Languages = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData } = useSelector(selectInit)
  const { langVisible } = useSelector(selectVisibility)
  const [selectedLang, setSelectedLang] = useState('')
  const getLang = useLang()

  useEffect(() => {
    setSelectedLang(initData.lang)
  }, [])

  useEffect(() => {
    if (langVisible) {
      dispatch(langHide())
    }
  }, [location.pathname])

  return (
    <ModalLayout
      visible={langVisible}
      close={() => {
        dispatch(langHide())
      }}
      footer={<button
        type='button'
        className='btn btn_lg'
        onClick={() => {
          dispatch(langHide())
          localStorage.setItem('lang', selectedLang)
          window.location.reload()
        }}
      >{getLang('ChooseLanguage')}</button>}
    >
      <div className='modal__header'>
        <h2 className='modal__title'>{getLang('languages')}</h2>
      </div>

      <div className='lang__list'>
        {Object.entries(initData.langs).map(([key, curLang]) => (
          <div
            className='lang__item'
            key={key}
            onClick={() => {
              setSelectedLang(curLang.code)
            }}
          >
            <img
              src={`/assets/images/lang/flag-${curLang.code}.svg`}
              width='20'
              height='20'
              alt={curLang.name}
            />
            {curLang.name}
            {curLang.code === selectedLang
              ? <div className='lang__item-icon'>
                <BsFillCheckCircleFill />
              </div>
              : ''
            }
          </div>
        ))}
      </div>
    </ModalLayout>
  )
}

export default Languages
