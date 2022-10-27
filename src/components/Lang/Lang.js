import './Lang.css'

import {
  useEffect,
  useState
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { selectInit } from '../../features/init/initSlice'
import {
  langHide,
  selectVisibility
} from '../../features/visibility/visibilitySlice'
import Popup from '../Popup/Popup'

const Lang = () => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { langVisible } = useSelector(selectVisibility)
  const [selectedLang, setSelectedLang] = useState('')

  useEffect(() => {
    setSelectedLang(initData.lang)
  }, [])

  return (
    <Popup
      visible={langVisible}
      close={() => {
        dispatch(langHide())
      }}
    >
      <div>Languages</div>
      {initData.langs.map((curLang) => (
        <div
          className={`lang__item ${curLang === selectedLang ? 'is-active' : ''}`}
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
          {curLang}
        </div>
      ))}
      <button
        type='button'
        className='btn'
        onClick={() => {
          dispatch(langHide())
          localStorage.setItem('lang', selectedLang)
          window.location.reload()
        }}
      >Выбрать язык</button>
    </Popup>
  )
}

export default Lang
