import './Currency.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { selectInit } from '../../features/init/initSlice'
import { currencyHide, selectVisibility } from '../../features/visibility/visibilitySlice'
import { useLang } from '../../hooks/useLang'
import ModalLayout from '../Modal/ModalLayout'

const Currency = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData } = useSelector(selectInit)
  const { currencyVisible } = useSelector(selectVisibility)
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const getLang = useLang()

  useEffect(() => {
    setSelectedCurrency(initData.currency)
  }, [])

  useEffect(() => {
    if (currencyVisible) {
      dispatch(currencyHide())
    }
  }, [location.pathname])

  return (
    <ModalLayout
      visible={currencyVisible}
      close={() => {
        dispatch(currencyHide())
      }}
      footer={<button
        type='button'
        className='btn btn_lg'
        onClick={() => {
          dispatch(currencyHide())
          localStorage.setItem('currency', selectedCurrency)
          window.location.reload()
        }}
      >{getLang('ChooseCurrency')}</button>}
    >
      <div className='modal__header'>
        <h2 className='modal__title'>{getLang('currency')}</h2>
      </div>

      <div className='currency__list'>
        {Object.entries(initData.currencies).map(([key, currency]) => (
          <div
            className={`currency__item ${currency.code === selectedCurrency ? 'is-active' : ''}`}
            key={key}
            onClick={() => {
              setSelectedCurrency(currency.code)
            }}
          >
            <span className='currency__item-icon' dangerouslySetInnerHTML={{ __html: currency.symbol }} />
            <span>{currency.name}</span>
            {currency.code === selectedCurrency
              ? <div className='currency__item-select-icon'>
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

export default Currency
