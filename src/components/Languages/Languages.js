import './Languages.css'

import {
  useEffect,
  useState
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { useLocation } from 'react-router-dom'
import { selectInit } from '../../features/init/initSlice'
import {
  langHide,
  selectVisibility
} from '../../features/visibility/visibilitySlice'
import { useLang } from '../../hooks/useLang'
import ModalLayout from '../Modal/ModalLayout'
import { BsFillCheckCircleFill } from 'react-icons/bs'

const Languages = () => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { langVisible } = useSelector(selectVisibility)
  const [selectedLang, setSelectedLang] = useState('')
  const getLang = useLang()
  const location = useLocation()

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
        className='btn'
        onClick={() => {
          dispatch(langHide())
          localStorage.setItem('lang', selectedLang)
          window.location.reload()
        }}
      >{getLang('select_language')}</button>}
    >
      <div className='modal__header'>
        <h2 className='modal__title'>{getLang('languages')}</h2>
      </div>

      <div className='lang__list'>
        {initData.langs.map((curLang) => (
          <div
            className='lang__item'
            key={curLang}
            onClick={() => {
              setSelectedLang(curLang)
            }}
          >
            <img
              src={`/assets/images/lang/flag-${curLang}.svg`}
              width='20'
              height='20'
              alt={curLang}
            />
            {getLang(curLang)}
            {curLang === selectedLang
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
